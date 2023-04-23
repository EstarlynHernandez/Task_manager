<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use Illuminate\Http\Request;
use App\Models\Task;
use PhpParser\Node\Stmt\TryCatch;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(Auth::user()){
            $tasks = Task::Where('user_id', Auth::user()->id)->get();
            
            return view('tasks/index', [
                'tasks' => $tasks,
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
        return redirect('/');
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
        if(Auth::user()){

            $task = new Task;
            
            $task->user_id = Auth::user()->id;
            $task->name = $request['name'];
            $task->details = ' ';
            $task->status = false;

            switch ($request['type']) {
                case 'count':
                    $task->type = 'count';
                    $task->count = 1;
                    if(is_numeric($request->count)){
                        $task->count = $request->count;
                    }
                    break;
                
                default:
                    $task->type = 'normal';
                    break;
            }

            
            $task->save();
        }

        return redirect('/');
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
    public function destroy(string $id)
    {
        if ($id) {

            $task = Task::find($id);
            if($task->user_id == Auth::user()->id){
                $task->delete();   
            }
            return redirect('/');
        }
    }
}
