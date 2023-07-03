<?php

namespace App\Console;


use App\Models\Task;
use DateTime;

class daily
{
    /**
     * Search task that are automatic repeating and repeating this
     */
    public function __construct($tasks)
    {
        foreach ($tasks as $task) {
            $days = $task['action'] - 20;
            if (new DateTime($task->date) <= new DateTime()) {
                Task::create([
                    'name' => $task['name'],
                    'details' => $task['details'],
                    'status' => false,
                    'type' => $task['type'],
                    'tgroup_id' => $task->tgroup_id,
                    'date' => date("Y-m-d", strtotime($task->date . " + $days days")),
                    'count' => $task->count,
                    'value' => $task->value,
                    'action' => $task->action,
                    'family' => $task->family,
                    'user_id' => $task->user_id,
                ]);
                $task->action = 20;
                $task->save();
            }
        }
    }
}
