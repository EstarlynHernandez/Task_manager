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
    <main class="content" id="content">
        @if (Auth::user())
            <h1 class="tasks__title">Your Tasks {{ session()->get('group') }}</h1>
        @else
            <h1 class="tasks__title">Local Tasks</h1>
        @endif
        <ul class="tasks container">
            @isset($tasks)
                @if ($tasks->count() < 1)
                    <li>
                        <p class="some__text">The day is so long, find something to do</p>
                        <p class="some__text">I you are working all day, i am sorry</p>
                        <p class="some__text">The live is only one, enjoy and be happy</p>
                    <li>
                @endif
                @foreach ($tasks as $task)
                    <li id="{{ $task->id }}" class="tasks__list @if ($task['status']) task__complete @endif">
                        <div class="task">
                            <div class="task__checked checked">
                                <form action="{{ route('task.check') }}" method="post">
                                    @csrf
                                    @method('put')
                                    <input type="hidden" name="id" value="{{ $task['id'] }}">
                                </form>
                                <svg fill="transparent" width="2rem" height="2rem">
                                    <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="7"
                                        stroke-dasharray="251% 251%" />
                                    <circle cx="50%" cy="50%" r="40%" stroke="#fff"
                                        stroke-width="3" stroke-dasharray="251% 251%" />
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
                            <div class="task__time taskExtra">
                                @if ($task['type'] == 'count')
                                    <h3 class="task__title" style="text-transform: capitalize">{{ $task['type'] }}</h3>
                                    <p class="task__text">{{ $task->times() }}</p>
                                @endif
                            </div>
                        </div>
                        <div class="task__delete delete">
                            <form action="{{ route('task.destroy', ['task' => $task['id']]) }}" method="post">
                                @csrf
                                @method('delete')
                            </form>
                            <p>Remove</p>
                        </div>
                    </li>
                @endforeach
            @endisset
        </ul>
    </main>
    <div class="floating__button createTab">
        <svg fill="transparent" width="3.5rem" height="3.5rem">
            <line x1="50%" x2="50%" y1="10%" y2="90%" stroke="#7f7" stroke-width="10"
                stroke-linecap="round" />
            <line x1="90%" x2="10%" y1="50%" y2="50%" stroke="#7f7" stroke-width="10"
                stroke-linecap="round" />
        </svg>
    </div>
    <section class="create dnone">
        <div class="create__header">
            <h1 class="create__title">Add Task</h1>
            <div class="close closeTab">
                <p>Close</p>
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

            <fieldset class="form__set">
                <label for="type" class="form__title">Type</label>
                <select name="type" class="form__input" id="type">
                    <option selected value="normal">Normal</option>
                    <option value="count">Count</option>
                </select>
            </fieldset>

            <fieldset class="form__set form__secret dnone" id="count">
                <label class="form__title" for="times">Times</label>
                <input type="number" name="count" id="times" class="form__input">
            </fieldset>

            <button class="form__button" type="submit">Create</button>
        </form>
    </section>
@endsection
