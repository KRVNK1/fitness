<?php

namespace App\Http\Controllers\Membership;

use App\Enums\Payment\PaymentStatusEnum;
use App\Http\Controllers\Controller;
use App\Models\Membership;
use App\Models\MembershipType;
use App\Models\Transaction;
use App\Service\Payment\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use YooKassa\Client;
use YooKassa\Model\Notification\NotificationEventType;
use YooKassa\Model\Notification\NotificationSucceeded;
use YooKassa\Model\Notification\NotificationWaitingForCapture;

class MembershipController extends Controller
{
    private $yookassa;

    public function __construct()
    {
        $this->yookassa = new Client();
        $this->yookassa->setAuth(
            config('services.yookassa.shop_id'),
            config('services.yookassa.secret_key')
        );
    }

    /*
     * Общая страница
     */
    public function index()
    {
        $membershipTypes = MembershipType::where('is_active', true)->get();

        return Inertia::render('Welcome', [
            'membershipTypes' => $membershipTypes
        ]);
    }

    /*
     * Страница оформления абонемента
     */
    public function create($slug)
    {
        $membershipType = MembershipType::where('is_active', true)
            ->where('slug', $slug)
            ->first();

        if (!$membershipType) {
            abort(404);
        }

        return Inertia::render('Memberships/Create', [
            'membershipType' => $membershipType
        ]);
    }

    /**
     * Создать платеж в YooKassa
     */
    public function createPayment(Request $request, PaymentService $service)
    {
        $request->validate([
            'membership_type' => 'required|in:light,smart,infinity',
            'months' => 'required|integer|min:1|max:12',
        ]);

        $membershipType = MembershipType::where('slug', $request->membership_type)->firstOrFail();
        $months = $request->months;
        $amount = $membershipType->price * $months;

        $decription = 'Абонемент ' . $membershipType->name . ' успешно оформлен на ' . $months . ' месяцев. Сумма: ' . $amount;

        // Создаем транзакцию в БД
        $transaction = Transaction::create([
            'user_id'             => Auth::id(),
            'membership_type_id'  => $membershipType->id,
            'amount'              => $amount,
            'months'              => $months,
            'description'         => $decription,
        ]);

        if ($transaction) {
            $link = $service->createPayment($amount, $decription, [
                'transaction_id' => $transaction->id
            ]);

            return redirect()->away($link);
        }
        // return redirect()->away(route('membership.payment.success', ['transaction' => $transaction->id]));
    }


    public function callback(Request $request, PaymentService $service)
    {
        $source = file_get_contents('php://input');
        $requestBody = json_decode($source, true);
        $notification = ($requestBody['event'] === NotificationEventType::PAYMENT_SUCCEEDED)
            ? new NotificationSucceeded($requestBody)
            : new NotificationWaitingForCapture($requestBody);

        $payment = $notification->getObject();
        if (isset($payment->status) && $payment->status === 'succeeded') {
            if ((bool) $payment->paid === true) {
                $metadata = (object)$payment->metadata;
                if (isset($metadata->transaction_id)) {
                    $transactionId = (int) $metadata->transaction_id;
                    $transaction = Transaction::findOrFail($transactionId);
                    $transaction->status = PaymentStatusEnum::CONFIRMED;
                    $transaction->save();
                }
            }
        }
    }

    /**
     * Обработка успешного платежа
     */
    public function paymentSuccess($transactionId)
    {
        $transaction = Transaction::findOrFail($transactionId);

        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }

        // Проверяем статус платежа в YooKassa
        try {
            $payment = $this->yookassa->getPaymentInfo($transaction->id); // вот это комментить на локалке

            if ($payment->getStatus() === 'succeeded') { // вот это комментить на локалке
                DB::transaction(function () use ($transaction) {
                    // Обновляем статус транзакции
                    $transaction->update(['status' => PaymentStatusEnum::CONFIRMED]);

                    // Создаем новый абонемент
                    $startDate = now();
                    $endDate = $startDate->copy()->addMonths($transaction->months);

                    Membership::create([
                        'user_id'            => $transaction->user_id,
                        'membership_type_id' => $transaction->membership_type_id,
                        'start_date'         => $startDate,
                        'end_date'           => $endDate,
                        'status'             => 'active',
                    ]);
                });

                return Inertia::render('Memberships/Success', [
                    'transaction' => $transaction
                ]);
            }
        } catch (\Exception $e) {
            return view('memberships.error', ['error' => $e->getMessage()]);
        }

        // return view('memberships.pending', compact('transaction'));
    }

    /**
     * Webhook для уведомлений от YooKassa
     */
    public function webhook(Request $request)
    {
        try {
            $source = file_get_contents('php://input');
            $requestBody = json_decode($source, true);

            if ($requestBody['event'] === 'payment.succeeded') {
                $paymentId = $requestBody['object']['id'];
                $transaction = Transaction::where('payment_id', $paymentId)->first();

                if ($transaction && $transaction->status === 'pending') {
                    DB::transaction(function () use ($transaction) {
                        $transaction->update(['status' => 'completed']);

                        // Деактивируем текущий абонемент
                        if ($currentMembership = $transaction->user->membership) {
                            $currentMembership->delete();
                        }

                        // Создаем новый абонемент
                        $startDate = now();
                        $endDate = $startDate->copy()->addMonths($transaction->months);

                        Membership::create([
                            'user_id' => $transaction->user_id,
                            'membership_type_id' => null, // Пока null, так как используем статические данные
                            'start_date' => $startDate,
                            'end_date' => $endDate,
                            'status' => 'active',
                        ]);
                    });
                }
            }

            return response()->json(['status' => 'success']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
