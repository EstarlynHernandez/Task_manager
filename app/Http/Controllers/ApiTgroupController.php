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
        $tgroups = Tgroup::select('id', 'name')->where('user_id', Auth::user()->id)->get();
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $item = $request->validate([
            'name' => ['required', 'max:20', 'regex:/^[\pL\s\d]+$/u'],
        ]);

        $tgroup = new Tgroup;

        $tgroup->name = $item['name'];
        $tgroup->user_id = Auth::user()->id;
        $tgroup->save();

        $user = User::find(Auth::user()->id);
        $user->task_group = $tgroup->id;
        $user->save();

        return response()->json(['groups' => $this->getGroup(), 'active' => $tgroup->id]);
    }


    public function check(Request $request)
    {
        $item = $request->validate([
            'id' => ['required']
        ]);

        $user = User::find(Auth::user()->id);

        switch ($item['id']) {
            case 'task':
                $user->task_group = 'task';
                break;

            default:
                if (Tgroup::where('id', $item['id'])->exists()) {
                    $user->task_group = $item['id'];
                } else {
                    switch ($item['id']) {
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
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $item = $request->validate([
            'id' => ['numeric', 'required']
        ]);

        $tGroup = Tgroup::find($item['id']);

        if ($tGroup->exists() && $tGroup->user_id == Auth::user()->id) {
            $tGroup->name = $request['name'];
            $tGroup->save();
            return response()->json(['groups' => $this->getGroup()]);
        }
        return response()->json(['error' => true, 'groups' => $this->getGroup()]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $item = $request->validate([
            'id' => ['numeric', 'required']
        ]);

        $tgroup = Tgroup::find($item['id']);

        if ($tgroup->exists() && $tgroup->user_id == Auth::user()->id) {
            $user = User::find(Auth::user()->id);
            if (Auth::user()->task_group == $tgroup->id) {
                $user->task_group = 'task';
                $user->save();
            }

            $tasks = Task::where('tgroup_id', $tgroup->id)->get();
            foreach ($tasks as $task) {
                $task->delete();
            }

            $tgroup->delete();

            return response()->json(['error' => false, 'groups' => $this->getGroup(), 'active' => $user->task_group]);
        }
        return response()->json(['error' => 'error']);
    }
}
