<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Tgroup;
use Illuminate\Database\Eloquent\Casts\Json;
use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $group, Request $request)
    {
        $request->session()->put('group', $group);

        if (Auth::user()) {
            $groups = Tgroup::Where('user_id', Auth::user()->id)->get();
            if ($group == 0 or !Tgroup::where('id', $group)->exists()) {
                $request->session()->put('group', 0);
                $tasks = Task::Where('user_id', Auth::user()->id)->where('tgroup_id', 0)->get();
            } else {
                $tasks = Task::Where('user_id', Auth::user()->id)->where('tgroup_id', $group)->get();
            }

            return view('tasks/index', [
                'tasks' => $tasks,
                'groups' => $groups,
            ]);
        }

        return view('tasks/index');
    }

    public function check(Request $request)
    {
        if ($request['id']) {

            $task = Task::find($request['id']);

            $task->status = !!!($task->status);
            $task->save();
        }
        return redirect('/' . $request->session()->get('group'));
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
    public function store(TaskRequest $request)
    {
        if ($request->session()->get('group') == 0  or Tgroup::where('id', $request->session()->get('group'))->where('user_id', Auth::user()->id)->exists()) {
            if (Auth::user()) {

                $task = new Task;

                $task->user_id = Auth::user()->id;
                $task->name = $request['name'];
                $task->details = ' ';
                $task->status = false;
                $task->tgroup_id = $request->session()->get('group');

                switch ($request['type']) {
                    case 'count':
                        $task->type = 'count';
                        $task->count = '0-1';
                        if (is_numeric($request->count)) {
                            $task->count = "0-$request->count";
                        }
                        break;

                    default:
                        $task->type = 'normal';
                        break;
                }

                $task->save();
            }
        }

        return redirect('/' . $request->session()->get('group'));
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
    public function destroy(string $id, Request $request)
    {
        if ($id) {

            $task = Task::find($id);
            if ($task->user_id == Auth::user()->id) {
                $task->delete();
            }
        }
        return redirect('/' . $request->session()->get('group'));
    }

    public function up(Request $request)
    {
        $task = Task::where('id', 11)->first();

        $task->status = !!!($task->status);
        $task->save();
    }
}
