@extends('../base')

@section('title')
    Tasks
@endsection

@section('content')
    <main>
        <h1 class="tasks__title">Your Tasks</h1>
        <ul class="tasks container">

            @foreach ($tasks as $task)
                <li class="task @if ($task['status']) task__complete @endif">
                    <a href="/" class="task__checked">
                        <svg fill="transparent" width="2rem" height="2rem">
                            <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="5"
                                stroke-dasharray="251 251" />
                            <circle cx="50%" cy="50%" r="40%" stroke="red" stroke-width="5"
                                stroke-dasharray="100 251" />
                            @if ($task['status'])
                                task__complete
                                <line x1="28%" x2="45%" y1="40%" y2="70%" stroke="black"
                                    stroke-width="5" stroke-linecap="round" />
                                <line x1="45%" x2="90%" y1="70%" y2="10%" stroke="black"
                                    stroke-width="5" stroke-linecap="round" />
                            @endif
                        </svg>
                    </a>
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
                    <a href="#" class="task__delete task__checked">
                        <svg fill="transparent" width="2rem" height="2rem">
                            <line x1="90%" x2="10%" y1="10%" y2="90%" stroke="red"
                                stroke-width="5" stroke-linecap="round" />
                            <line x1="90%" x2="10%" y1="90%" y2="10%" stroke="red"
                                stroke-width="5" stroke-linecap="round" />
                        </svg>
                    </a>
                </li>
            @endforeach

            <li class="task task__complete">
                <a href="/" class="task__checked">
                    <svg fill="transparent" width="2rem" height="2rem">
                        <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="5"
                            stroke-dasharray="251 251" />
                        <circle cx="50%" cy="50%" r="40%" stroke="red" stroke-width="5"
                            stroke-dasharray="100 251" />
                        <line x1="28%" x2="45%" y1="40%" y2="70%" stroke="black" stroke-width="5"
                            stroke-linecap="round" />
                        <line x1="45%" x2="90%" y1="70%" y2="10%" stroke="black" stroke-width="5"
                            stroke-linecap="round" />
                    </svg>
                </a>
                <div class="task__info">
                    <h3 class="task__title">Tasks Name</h3>
                    <p class="task__text">Task info</p>
                </div>
                <div class="task__time">
                    <h3>Start</h3>
                    <p>24:60</p>
                </div>
                <a href="#" class="task__delete task__checked">
                    <svg fill="transparent" width="2rem" height="2rem">
                        <line x1="90%" x2="10%" y1="10%" y2="90%" stroke="red"
                            stroke-width="5" stroke-linecap="round" />
                        <line x1="90%" x2="10%" y1="90%" y2="10%" stroke="red"
                            stroke-width="5" stroke-linecap="round" />
                    </svg>
                </a>
            </li>

            <li class="task">
                <a href="/" class="task__checked">
                    <svg fill="transparent" width="2rem" height="2rem">
                        <circle cx="50%" cy="50%" r="40%" stroke="black" stroke-width="5"
                            stroke-dasharray="251 251" />
                        <circle cx="50%" cy="50%" r="40%" stroke="red" stroke-width="5"
                            stroke-dasharray="calc(80 * .50) 80" />
                    </svg>
                </a>
                <div class="task__info">
                    <h3 class="task__title">Tasks Name</h3>
                    <p class="task__text">Task info</p>
                </div>
                <div class="task__time">
                </div>
                <a href="#" class="task__delete task__checked">
                    <svg fill="transparent" width="2rem" height="2rem">
                        <line x1="90%" x2="10%" y1="10%" y2="90%" stroke="red"
                            stroke-width="5" stroke-linecap="round" />
                        <line x1="90%" x2="10%" y1="90%" y2="10%" stroke="red"
                            stroke-width="5" stroke-linecap="round" />
                    </svg>
                </a>
            </li>
        </ul>
    </main>
@endsection
