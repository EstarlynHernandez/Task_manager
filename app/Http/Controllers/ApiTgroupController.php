<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Tgroup;
use App\Models\User;
use App\Models\Task;

class ApiTgroupController extends Controller
{

    private function getGroup()
    {
        $tgroups = Tgroup::where('user_id', Auth::user()->id)->get();
        return $tgroups;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(['groups' => $this->getGroup(), 'active' => Auth::user()->task_group]);
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
        $validate = $request->validate([
            'name' => ['required', 'max:20', 'regex:/^[\pL\s\d]+$/u'],
        ]);

        $tgroup = new Tgroup;

        $tgroup->name = $validate['name'];
        $tgroup->user_id = Auth::user()->id;
        $tgroup->save();

        $tgroups = Tgroup::where('user_id', Auth::user()->id)->get();

        $user = User::find(Auth::user()->id);
        $user->task_group = $tgroup->id;
        $user->save();

        return response()->json(['groups' => $tgroups, 'active' => $tgroup->id]);
    }

    public function check(Request $request)
    {
        try {
            //code...
            //throw $th;
            $user = User::find(Auth::user()->id);
            switch ($request['id']) {
                case 'task':
                    $user->task_group = 'task';
                    break;

                default:
                    if (Tgroup::where('id', $request['id'])->exists()) {
                        $user->task_group = $request['id'];
                    } else {
                        switch ($request['id']) {
                            case 'daily':
                                $user->task_group = 'daily';
                                break;
                            case 'date':
                                $user->task_group = 'date';
                                break;
                            default:
                                $user->task_group = 'task';
                                break;
                        }
                    }

                    break;
            }
            $user->save();
            return response()->json(['active' => $user->task_group]);
        } catch (\Throwable $th) {
            return response()->json(['error' => 'generic']);
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
            $tGroup = Tgroup::find($request['id']);
            if ($tGroup->user_id == Auth::user()->id) {
                $tGroup->name = $request['name'];
                $tGroup->save();
            }
            return response()->json(['groups' => $this->getGroup()]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage(), 'groups' => $this->getGroup()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        try {
            //code...
            $tgroup = Tgroup::find($request->id);

            if ($tgroup->user_id == Auth::user()->id) {
                $tasks = Task::where('tgroup_id', $tgroup->id)->get();
                foreach ($tasks as $task) {
                    $task->delete();
                }
                $tgroup->delete();
            }
        } catch (\Throwable $th) {
            return response()->json(['error' => 'error']);
        }

        return response()->json(['status' => 'complete', 'groups' => $this->getGroup()]);
    }
}
