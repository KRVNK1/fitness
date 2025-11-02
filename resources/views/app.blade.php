<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <meta name="description" content="IRKFITNESS - Современный фитнес-клуб в Иркутске с профессиональным оборудованием, SPA-зоной и тренажерными залами. Тарифы от 1990₽ в месяц.">
    <meta name="keywords" content="фитнес клуб irkfitness, спортзал irkfitness, тренажерный зал irkfitness, irkfitness Иркутск, irkfitness, фитнес-клуб, тренировки irkfitness, SPA">
    <meta name="author" content="irkfitness">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap"
        rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
