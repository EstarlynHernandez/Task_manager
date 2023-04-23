<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title')</title>

    {{-- <link rel="stylesheet" href="{{ mix('resources/css/app.css') }}"> --}}
    @vite('resources/css/app.css')
    @yield('meta')
</head>

<body>
    <header>
        <div class="header">
            <a href="/"><img src="{{ asset('icons/logo.svg') }}" alt=""></a>
            <div>
                @if (Auth::user())
                <form action="{{ route('logout') }}" method="post">
                    @csrf
                    @method('delete')
                    <button class="menu__button" type="submit">logout</button>
                </form>
                @else
                    <a class="menu__button" href="/login">Login</a>
                @endif
            </div>
        </div>
    </header>
    @yield('content')
</body>

</html>
