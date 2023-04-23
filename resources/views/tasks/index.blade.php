@extends('../base')

@section('title')
    Tasks
@endsection

@section('meta')
    @if (Auth::user())
        @vite('resources/js/app.js')
    @else
        @vite('resources/js/local.js')
    @endif
@endsection

@section('content')
    <main>
        <h1 class="tasks__title">Your Tasks</h1>
        <ul class="tasks container">
            @isset($tasks)
                @if ($tasks->count() < 1)
                    <p class="some__text">The day is so long, find something to do</p>
                    <p class="some__text">I you are working all day, i am sorry</p>
                    <p class="some__text">The live is only one, enjoy and be happy</p>
                @endif
                @foreach ($tasks as $task)
                    <li class="task @if ($task['status']) task__complete @endif">
                        <div class="task__checked checked">
                            <form action="{{ route('task.check') }}" method="post">
                                @csrf
                                @method('put')
                                <input type="hidden" name="id" value="{{ $task['id'] }}">
                            </form>
                            <svg fill="transparent" width="2rem" height="2rem">
                                <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="5"
                                    stroke-dasharray="251 251" />
                                <circle cx="50%" cy="50%" r="40%" stroke="red" stroke-width="5"
                                    stroke-dasharray="100 251" />
                                @if ($task['status'])
                                    <line x1="28%" x2="45%" y1="40%" y2="70%" stroke="black"
                                        stroke-width="5" stroke-linecap="round" />
                                    <line x1="45%" x2="90%" y1="70%" y2="10%" stroke="black"
                                        stroke-width="5" stroke-linecap="round" />
                                @endif
                            </svg>
                        </div>
                        <div class="task__info">
                            <h3 class="task__title">{{ $task['name'] }}</h3>
                            <p class="task__text">{{ Str::limit($task['details'], 10) }}</p>
                        </div>
                        @if ($task['type'] != 'normal')
                            <div class="task__time">
                                <h3>Count</h3>
                                <p>0-10</p>
                            </div>
                        @endif
                        <div class="task__delete delete">
                            <form action="{{ route('task.delete', ['id' => $task['id']]) }}" method="post">
                                @csrf
                                @method('delete')
                            </form>
                            <svg fill="transparent" width="2rem" height="2rem">
                                <line x1="80%" x2="20%" y1="20%" y2="80%" stroke="red"
                                    stroke-width="5" stroke-linecap="round" />
                                <line x1="80%" x2="20%" y1="80%" y2="20%" stroke="red"
                                    stroke-width="5" stroke-linecap="round" />
                            </svg>
                        </div>
                    </li>
                @endforeach
            @endisset
        </ul>
        <div class="floating__button createTab">
            <svg fill="transparent" width="3.5rem" height="3.5rem">
                <line x1="50%" x2="50%" y1="10%" y2="90%" stroke="#0f0" stroke-width="10"
                    stroke-linecap="round" />
                <line x1="90%" x2="10%" y1="50%" y2="50%" stroke="#0f0" stroke-width="10"
                    stroke-linecap="round" />
            </svg>
        </div>
    </main>
    <section class="create dnone">
        <div class="create__header">
            <h1 class="create__title">Add Task</h1>
            <div class="task__delete closeTab">
                <svg fill="transparent" width="3.8rem" height="3.8rem">
                    <line x1="80%" x2="20%" y1="20%" y2="80%" stroke="red" stroke-width="10"
                        stroke-linecap="round" />
                    <line x1="80%" x2="20%" y1="80%" y2="20%" stroke="red" stroke-width="10"
                        stroke-linecap="round" />
                </svg>
            </div>
        </div>
        <form class="form taskCreate" action="{{ route('task.store') }}" method="post">
            @csrf
            <fieldset class="form__set">
                <label class="form__title" for="name">Name</label>
                <input class="form__input" id="name" type="text" name="name">
            </fieldset>

            <fieldset class="form__set">
                <label class="form__title" for="details">Details</label>
                <textarea class="form__textarea" id="details" name="details"></textarea>
            </fieldset>

            <button class="form__button" type="submit">Create</button>
        </form>
    </section>
@endsection
