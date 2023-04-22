<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>
    
    {{-- <link rel="stylesheet" href="{{ mix('resources/css/app.css') }}"> --}}
    @vite("resources/css/app.css")
    @yield('meta')
</head>
<body>
    <header>
        <div class="header">
            <a href="/">Estyos Tasks</a>
        </div>
    </header>
    @yield('content')
</body>
</html>