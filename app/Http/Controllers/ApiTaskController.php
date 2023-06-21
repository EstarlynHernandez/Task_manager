<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\task;
use Illuminate\Support\Facades\Auth;

class ApiTaskController extends Controller
{
    private function getTask()
    {
        switch (Auth::user()->task_group) {
            case 'daily':
                $tasks = Task::orderBy('created_at', 'desc')->where('user_id', Auth::user()->id)->where('tgroup_id', null)->get();
                break;
            default:
                try {
                    //code...
                    $tasks = Task::orderBy('created_at', 'desc')->where('user_id', Auth::user()->id)->where('tgroup_id', Auth::user()->task_group)->get();
                } catch (\Throwable $th) {
                    $tasks = Task::orderBy('created_at', 'desc')->where('user_id', Auth::user()->id)->where('tgroup_id', null)->get();
                    //throw $th;
                }
                break;
        }
        return $tasks;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(string $device)
    {
        try {
            //code...x
            $oldToken = Auth::user()->tokens()->where('name', $device)->first();
            if ($oldToken['name'] == $device) {
                $oldToken->delete();
                $token = Auth::user()->createToken($device)->plainTextToken;
                return response()->json([
                    'tasks' => $this->getTask(),
                    'token' => $token,
                ]);
            }
            return response()->json([
                'error' => true
            ]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
            //throw $th;
        }
    }

    public function check(Request $request)
    {
        try {
            //code...
            $task = Task::find($request->input('id'));

            if ($task->user_id == Auth::user()->id) {
                if ($task->status) {
                    $task->value = $task->count;
                    if ($task->type == 'repeat') {
                        $task->value = 0;
                    }
                }
                $task->status = !$task->status;
                $task->save();
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => $request->id]);
        }

        return response()->json([
            'status' => 'complete',
            'tasks' => $this->getTask(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $item = $request->validate([
                'name' => ['required', 'max:36', 'min:3', 'regex:/^[\pL\s\d]+$/u'],
                'details' => ['nullable', 'max:512', 'min:3', 'regex:/^[\pL\s\d\.,\:;\-_]+$/u'],
                'type' => ['required', 'max:512', 'regex:/^[\pL]+$/u'],
                'count' => ['nullable', 'numeric', 'max:9999'],
                'value' => ['nullable', 'numeric', 'max:1440'],
            ]);

            $task = new Task;
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
            $task->user_id = Auth::user()->id;
            if (is_numeric(Auth::user()->task_group)) {
                $task->tgroup_id = Auth::user()->task_group;
            }

            $task->save();

            return response()->json(['tasks' => $this->getTask()]);
        } catch (\Throwable $th) {
            return response()->json([
                'tasks' => $this->getTask(),
                'error' => $th->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
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
        } catch (\Throwable $th) {
            return response()->json([
                'tasks' => $this->getTask(),
                'error' => $th->getMessage(),
            ]);
        }
    }

    public function setValue(Request $request)
    {
        try {
            //code...
            $task = Task::find($request->id);

            if ($task->user_id == Auth::user()->id) {
                $task->value = $request['value'];
                if ($task->type == 'repeat') {
                    $task->value = $request['value'] + 1;
                }
                $task->save();
                return response()->json(['tasks' => $this->getTask()]);
            }
            return response()->json(['errors' => 'permisions', 'tasks' => $this->getTask()]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage(), 'tasks' => $this->getTask()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        try {
            //code...
            $task = Task::find($request->id);

            if ($task->user_id == Auth::user()->id) {
                $task->delete();
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'error']);
        }

        return response()->json(['status' => 'complete', 'tasks' => $this->getTask()]);
    }
}
