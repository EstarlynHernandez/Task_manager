<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Task;
use App\Console\daily;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // for task repeating
        // 20-already repeated
        // 21-every day
        // 22-every 2day
        // 23-every 3day
        // 24-every 4day
        // 25-every 5day
        // 26-every 6day
        // 27-every week
        // 28-every 15day
        // 29-every month
        $schedule->call(function () {
            $tasks = Task::whereIn('action', [21, 22, 23, 24, 25, 26])->get();
            new daily($tasks);
        })->daily()->name('daily');

        $schedule->call(function () {
            $tasks = Task::whereIn('action', [27, 28])->get();
            new daily($tasks);
        })->sundays()->name('weekly');

        $schedule->call(function () {
            $dailyTask = Task::where('action', 29)->get();
            new daily($dailyTask, 30);
        })->monthly()->name('monthy');
        

        // $schedule->call(new daily)->everyMinute();
    }
}
