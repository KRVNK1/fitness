<?php

use App\Http\Controllers\Membership\MembershipController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->prefix('membership')->name('membership.')->group(function () {
    Route::get('/', [MembershipController::class, 'index'])->name('index');
    Route::get('/create/{slug}', [MembershipController::class, 'create'])->name('create');
    Route::post('/payment', [MembershipController::class, 'createPayment'])->name('payment.create');
    Route::get('/success/{transaction}', [MembershipController::class, 'paymentSuccess'])->name('payment.success');
});

Route::match(['get', 'post'], '/payments/callback', [MembershipController::class, 'callback'])->name('payments.callback');
