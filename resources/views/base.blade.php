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
                    <div id="openMenu" class="menuI">
                        <img src="{{ asset('icons/menu.svg') }}" alt="">
                    </div>
                @else
                    <a class="menu__button" href="/login">Login</a>
                @endif
            </div>
        </div>
    </header>
    @yield('content')
    <div class="shadow closeTab dnone"></div>
    @if (Auth::user())
        <section id="menu" class="menu dnone">
            <div class="userM">
                <div class="userM__user">
                    <a href="#" class="userM__title">{{ Auth::user()->username }}</a>
                </div>
                <div class="userM__close closeTab close">
                    <p>Close</p>
                </div>
            </div>
            <ul class="listM">
                <li class="listM__item listM__open">
                    <a class="listM__link" href="/">Daily Task</a>
                </li>

                @foreach ($groups as $group)
                    <li class="listM__item listM__open">
                        <a class="listM__link" href="{{ route('home', [$group->name]) }}">{{ $group->name }}</a>
                    </li>
                @endforeach
            </ul>
            <form class="form menu__form" method="post" action="{{ route('tgroup.store') }}">
                @csrf
                <h3 class="form__title">Add Group</h3>

                <fieldset class="form__set">
                    <input placeholder="Name" type="text" id="gName" name="gname" class="form__input">
                </fieldset>

                <button type="submit" class="form__button group__button">Create</button>
            </form>
            <form action="{{ route('logout') }}" method="post">
                @csrf
                @method('delete')
                <button class="listM__logout" type="submit">logout</button>
            </form>
        </section>
    @endif
</body>

</html>
