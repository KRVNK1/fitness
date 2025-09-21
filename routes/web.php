<?php

use App\Http\Controllers\Membership\MembershipController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [MembershipController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('membership')->name('membership.')->group(function () {
        Route::get('/', [MembershipController::class, 'index'])->name('index');
        Route::get('/create/{slug}', [MembershipController::class, 'create'])->name('create');
        Route::post('/payment', [MembershipController::class, 'createPayment'])->name('payment.create');
        Route::get('/success/{transaction}', [MembershipController::class, 'paymentSuccess'])->name('payment.success');
    });
});

Route::match(['get', 'post'], '/payments/callback', [MembershipController::class, 'callback'])->name('payments.callback');

require __DIR__.'/auth.php';