@extends('../base')
@section('title')Login @endsection
@section('content')
    <section>
        <h1 class="tasks__title">Login</h1>
        <form action="{{ route('auth') }}" method="post" class="form">
            @csrf
            <fieldset class="form__set">
                <label for="email" class="form__title" >Email</label>
                <input type="email" id="email" name="email" class="form__input">
            </fieldset>
            
            <fieldset class="form__set">
                <label for="password" class="form__title">Password</label>
                <input type="password" id="password" name="password" class="form__input">
            </fieldset>

            <button type="submit" class="form__button">Login</button>
            <a class="form__changeLink" href="{{ route('user.create') }}">Register</a>
        </form>
    </section>
@endsection