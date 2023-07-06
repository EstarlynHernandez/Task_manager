<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use DateTime;
use Illuminate\Support\Facades\Auth;

class ApiTaskController extends Controller
{
    private function getTask()
    {
        if (is_numeric(Auth::user()->task_group)) {
            $tasks = Task::orderBy('created_at', 'desc')->where('user_id', Auth::user()->id)->where('tgroup_id', Auth::user()->task_group)->get();
        } else {
            switch (Auth::user()->task_group) {
                case 'daily':
                    $tasks = Task::orderBy('created_at', 'desc')->where('user_id', Auth::user()->id)->where('action', '>=', 20)->where('action', '<=', 29)->get();
                    break;
                case 'date':
                    $tasks = Task::orderBy('created_at', 'desc')->where('user_id', Auth::user()->id)->where('action', 3)->get();
                    break;
                default:
                    $tasks = Task::orderBy('created_at', 'desc')->where('user_id', Auth::user()->id)->where('action', 1)->get();
            }
        }
        return $tasks;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(string $device)
    {
        try {
            $oldToken = Auth::user()->tokens()->where('name', $device)->first();
            if ($oldToken['name'] === $device) {
                $oldToken = Auth::user()->tokens()->where('name', $device)->first()->delete();
                $newToken = Auth::user()->createToken($device)->plainTextToken;
                return response()->json([
                    'tasks' => $this->getTask(),
                    'token' => $newToken,
                ]);
            }
            return response()->json([
                'error' => 'session'
            ]);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'Generic']);
        }
    }


    public function check(Request $request)
    {
        //code...
        $task = Task::find($request->input('id'));

        if (isset($task->user_id) && $task->user_id == Auth::user()->id) {
            if ($task->status) {
                $task->value = $task->count;
                if ($task->type == 'repeat') {
                    $task->value = 0;
                }
            }
            $task->status = !$task->status;
            $task->save();
        } else {
            return response()->json(['error' => 'generic']);
        }

        return response()->json([
            'status' => 'complete',
            'tasks' => $this->getTask(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //code...
        $item = $request->validate([
            'name' => ['required', 'max:36', 'min:3', 'regex:/^[\pL\s\d]+$/u'],
            'details' => ['nullable', 'max:512', 'min:3', 'regex:/^[\pL\s\d\.,\:;\-_]+$/u'],
            'type' => ['required', 'max:512', 'regex:/^[\pL]+$/u'],
            'count' => ['nullable', 'numeric', 'max:9999'],
            'value' => ['nullable', 'numeric', 'max:1440'],
            'date' => ['nullable', 'date'],
            'repeat' => ['nullable', 'numeric'],
        ]);

        $task = new Task;
        $task->name = $item['name'];
        $task->details = $item['details'];
        $task->type = $item['type'];
        $task->status = false;
        $task->user_id = Auth::user()->id;
        $task->date = new \DateTime('now', new \DateTimeZone("UTC"));

        if ($item['type'] == 'time') {
            $task->value = 10;
            $task->count = 10;
            if ($item['value'] != null && floatval($item['value']) > 0) {
                $task->value = floatval($item['value']) * 60;
                $task->count = floatval($item['value']) * 60;
            }
        } else if ($item['type'] == 'repeat') {
            $task->count = 1;
            $task->value = 0;
            if (is_numeric($item['count'])) {
                $task->count = intval($item['count']);
            }
        }

        if (!is_numeric(Auth::user()->task_group)) {
            switch (Auth::user()->task_group) {
                case "daily":
                    $task->action = 21;
                    $task->family = substr($item['name'], 0, 3) . random_int(10000, 99999) . (new DateTime())->format('ymdhms');
                    if (isset($item['date'])) {
                        $task->date = new DateTime($item['date']);
                    }
                    if (isset($item['repeat'])) {
                        $task->action = $item['repeat'] + 20;
                    }
                    break;
                case "date":
                    $task->action = 3;
                    if (isset($item['date'])) {
                        $task->date = new DateTime($item['date']);
                    }
                    break;
                default:
                    $task->action = 1;
                    break;
            }
        } else {
            $task->tgroup_id = Auth::user()->task_group;
        }

        $task->save();
        return response()->json(['tasks' => $this->getTask()]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $item = $request->validate([
            'name' => ['required', 'max:36', 'min:3', 'regex:/^[\pL\s\d]+$/u'],
            'details' => ['nullable', 'max:512', 'min:3', 'regex:/^[\pL\s\d\.,\:;\-_]+$/u'],
            'type' => ['required', 'max:512', 'regex:/^[\pL]+$/u'],
            'count' => ['nullable', 'numeric', 'max:9999'],
            'value' => ['nullable', 'numeric', 'max:1440'],
        ]);

        $task = Task::find($request['id']);
        $task->name = $item['name'];
        $task->details = $item['details'];
        $task->type = $item['type'];
        if ($item['type'] == 'time') {
            $task->value = 10;
            $task->count = $item['value'] * 60;
            if ($item['value'] != null && floatval($item['value']) > 0) {
                $task->value = $item['value'] * 60;
                $task->count = $item['value'] * 60;
            }
        } else if ($item['type'] == 'repeat') {
            $task->count = 1;
            $task->value = 0;
            if (is_numeric($item['count'])) {
                $task->count = $item['count'];
            }
        }
        $task->status = false;

        $task->save();

        return response()->json(['tasks' => $this->getTask()]);
    }

    public function setValue(Request $request)
    {
        $item = $request->validate([
            'id' => ['numeric', 'required'],
            'value' => ['numeric', 'max:1440'],
        ]);
        $task = Task::find($item['id']);

        if ($task->user_id == Auth::user()->id) {
            $task->value = $item['value'];
            if ($task->type == 'repeat') {
                $task->value = $item['value'] + 1;
            }
            $task->save();
            return response()->json(['tasks' => $this->getTask()]);
        }
        return response()->json(['errors' => 'permisions', 'tasks' => $this->getTask()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $item = $request->validate([
            'id' => ['numeric', 'required']
        ]);
        $task = Task::find($item['id']);

        if (isset($task->user_id) && $task->user_id == Auth::user()->id) {
            $task->delete();
            return response()->json(['status' => 'complete', 'tasks' => $this->getTask()]);
        }

        return response()->json(['status' => 'error', 'tasks' => $this->getTask()]);
    }
}
