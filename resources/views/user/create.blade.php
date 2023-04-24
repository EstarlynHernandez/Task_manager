@extends('../base')
@section('title')Login @endsection
@section('content')
    <section>
        <h1 class="tasks__title">Register</h1>
        <form action="{{ route('user.store') }}" method="post" class="form">
            @csrf
            <fieldset class="form__set">
                <label for="email" class="form__title">Email</label>
                <input type="email" id="email" name="email" class="form__input">
            </fieldset>
            
            <fieldset class="form__set">
                <label for="username" class="form__title">Username</label>
                <input type="text" id="username" name="username" class="form__input">
            </fieldset>
            
            <fieldset class="form__set">
                <label for="name" class="form__title">Name</label>
                <input type="text" id="name" name="name" class="form__input">
            </fieldset>

            <fieldset class="form__set">
                <label for="lastname" class="form__title">LastName</label>
                <input type="text" id="lastname" name="lastname" class="form__input">
            </fieldset>
            
            <fieldset class="form__set">
                <label for="password" class="form__title">Password</label>
                <input type="password" id="password" name="password" class="form__input">
            </fieldset>
            
            <fieldset class="form__set">
                <label for="rePassword" class="form__title">Repeat Password</label>
                <input type="password" id="rePassword" name="rePassword" class="form__input">
            </fieldset>

            <button type="submit" class="form__button">Register</button>
        </form>
    </section>
@endsection