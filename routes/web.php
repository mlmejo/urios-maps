<?php

use App\Http\Controllers\EstablishmentController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/map', function () {
    return Inertia::render('Map');
})->middleware('auth')->name('map');

Route::resource('establishments', EstablishmentController::class)
    ->except(['update'])
    ->middleware('auth');

Route::post('/establishments/{establishment}', [EstablishmentController::class, 'update'])
    ->middleware('auth')
    ->name('establishments.update');

Route::get('/messages', [MessageController::class, 'index'])
    ->middleware('auth')
    ->name('messages.index');

Route::get('/messages/{user}', [MessageController::class, 'create'])
    ->middleware('auth')
    ->name('messages.create');

Route::post('/messages/{user}', [MessageController::class, 'store'])
    ->middleware('auth')
    ->name('messages.store');

require __DIR__ . '/auth.php';
