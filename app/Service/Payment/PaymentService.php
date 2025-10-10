<?php

namespace App\Service\Payment;

use App\Models\Transaction;
use YooKassa\Client;

class PaymentService
{
    public function getClient()
    {
        $client = new Client();
        $client->setAuth(
            config('services.yookassa.shop_id'),
            config('services.yookassa.secret_key')
        );

        return $client;
    }

    public function createPayment(float $amount, string $description, array $options = [])
    {
        $client = $this->getClient();
        $payment = $client->createPayment([
            'amount' => [
                'value' => $amount,
                'currency' => 'RUB',
            ],
            'capture' => false,
            'confirmation' => [
                'type' => 'redirect',
                'return_url' => route('membership.payment.success', ['transaction' => $options['transaction_id']]),
            ],
            'metadata' => [
                'transaction_id' => $options['transaction_id'],
            ],
            'description' => $description,
        ], uniqid('', true));

        $transaction = Transaction::find($options['transaction_id']);
        if ($transaction) {
            $transaction->update([
                'yookassa_payment_id' => $payment->getId(),
            ]);
        }

        return $payment->getConfirmation()->getConfirmationUrl();
    }
}
