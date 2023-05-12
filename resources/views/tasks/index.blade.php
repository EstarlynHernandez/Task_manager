@extends('../base')

@section('title')
    Tasks
@endsection

@vite('resources/react/react_app.jsx')
@section('meta')
    @if (Auth::user())
        @vite('resources/js/app.js')
    @else
        @vite('resources/js/local.js')
    @endif
@endsection

@section('content')
<main class="content" id="content">
        <div>
            <div class="task__header">
                @if (Auth::user())
                    <h1 class="tasks__title">Your Tasks</h1>
                @else
                    <h1 class="tasks__title">Local Tasks</h1>
                @endif
                <div class="floating__button createTab">
                    <svg fill="transparent" width="3.5rem" height="3.5rem">
                        <line x1="50%" x2="50%" y1="20%" y2="80%" stroke="#099" stroke-width="20"
                            stroke-linecap="round" />
                        <line x1="80%" x2="20%" y1="50%" y2="50%" stroke="#099" stroke-width="20"
                            stroke-linecap="round" />
                    </svg>
                </div>
            </div>
            <ul class="tasks container">
                @isset($tasks)
                    @if ($tasks->count() < 1)
                        <li>
                            <p class="some__text">This place is empty</p>
                        <li>
                    @endif
                    @foreach ($tasks as $task)
                        <li id="{{ $task->id }}"
                            class="tasks__list @if ($task['status']) task__complete @endif">
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
                                        <circle cx="50%" cy="50%" r="40%" stroke="#fff" stroke-width="3"
                                            stroke-dasharray="251% 251%" />
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
                                <div class="task__time taskExtra {{ $task['type'] }}">
                                    @if ($task['type'] == 'count')
                                        <h3 class="task__title" style="text-transform: capitalize">{{ $task['type'] }}</h3>
                                        <p class="task__text"><span class="task__value value">{{ $task->value }}</span>-<span
                                                class="task__limit value-2">{{ $task->count }}</span></p>
                                    @elseif ($task['type'] == 'time')
                                        <h3 class="task__title" style="text-transform: capitalize">Remains</h3>
                                        <p class="task__text"><span
                                                class="task__minutes value">{{ intval($task->value / 60) }}</span>m <span
                                                class="task__seconds value-2">{{ $task->value % 60 }}</span>s</p>
                                    @endif
                                </div>
                                <div class="close delete delete-desktop">
                                    <form action="{{ route('task.destroy', ['task' => $task['id']]) }}" method="post">
                                        @csrf
                                        @method('delete')
                                    </form>
                                    <p>Delete</p>
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
        </div>
    </main>
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
                <input required class="form__input" id="name" type="text" name="name">
            </fieldset>

            <fieldset class="form__set">
                <label class="form__title" for="details">Details</label>
                <textarea class="form__textarea" id="details" name="details"></textarea>
            </fieldset>

            @if (Auth::user())
                <fieldset class="form__set">
                    <label for="type" class="form__title">Type</label>
                    <select name="type" class="form__input" id="type">
                        <option selected value="normal">Normal</option>
                        <option value="count">Repeat</option>
                        <option value="time">Time</option>
                    </select>
                </fieldset>

                <fieldset class="form__set form__secret dnone" id="count">
                    <label class="form__title" for="times">How often</label>
                    <input type="number" name="count" id="times" class="form__input">
                </fieldset>

                <fieldset class="form__set form__secret dnone" id="time">
                    <label class="form__title" for="time">How long (m)</label>
                    <input type="number" placeholder="Minutes" name="time" id="time" class="form__input">
                </fieldset>
            @endif

            <button class="form__button" type="submit">Create</button>
        </form>
    </section>
@endsection
