<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\task;
use Illuminate\Support\Facades\Auth;

class ApiTaskController extends Controller
{
    private function getTask($group, $id)
    {
        switch ($group) {
            case 'daily':
                $tasks = Task::where('user_id', $id)->where('tgroup_id', null)->get();
                break;
            default:
                try {
                    //code...
                    $tasks = Task::where('user_id', $id)->where('tgroup_id', $group)->get();
                } catch (\Throwable $th) {
                    $tasks = Task::where('user_id', $id)->where('tgroup_id', null)->get();
                    //throw $th;
                }
                break;
        }
        return $tasks;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            //code...
            return response()->json([
                'tasks' => $this->getTask(Auth::user()->task_group, Auth::user()->id),
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
                $task->status = !$task->status;
                $task->save();
            }
        } catch (\Throwable $th) {
            return response()->json(['status' => $request->id]);
        }

        return response()->json([
            'status' => 'complete',
            'tasks' => $this->getTask(Auth::user()->task_group, Auth::user()->id),
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
                'name' => ['required', 'max:20', 'regex:/^[\pL\s\d]+$/u'],
                'details' => ['nullable', 'max:512', 'regex:/^[\pL\s\d\.,\:;\-_]+$/u'],
                'type' => ['required', 'max:512', 'regex:/^[\pL]+$/u'],
                'count' => ['nullable', 'numeric', 'max:999'],
                'value' => ['nullable', 'numeric', 'max:1440'],
            ]);

            $task = new Task;
            $task->name = $item['name'];
            $task->details = $item['details'];
            $task->type = $item['type'];
            if ($item['type'] == 'time') {
                $task->value = $item['value'] * 60;
                $task->count = $item['value'] * 60;
            } else if ($item['type'] == 'repeat') {
                $task->value = 0;
                $task->count = $item['count'];
            }
            $task->status = false;
            $task->user_id = Auth::user()->id;
            if(is_numeric(Auth::user()->task_group)){
                $task->tgroup_id = Auth::user()->task_group;
            }

            $task->save();

            return response()->json(['tasks' => $this->getTask(Auth::user()->task_group, Auth::user()->id)]);
        } catch (\Throwable $th) {
            return response()->json([
                'tasks' => $this->getTask(Auth::user()->task_group, Auth::user()->id),
                'error' => true,
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
    public function update(Request $request, string $id)
    {
        //
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
                $task->status = !$task->status;
                $task->delete();
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'error']);
        }

        return response()->json(['status' => 'complete', 'tasks' => $this->getTask(Auth::user()->task_group, Auth::user()->id)]);
    }
}
