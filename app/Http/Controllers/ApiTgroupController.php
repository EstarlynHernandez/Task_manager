<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Tgroup;
use App\Models\User;

class ApiTgroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tgroups = Tgroup::where('user_id', Auth::user()->id)->get();

        return response()->json(['groups' => $tgroups]);
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

        return response()->json(['groups' => $tgroups]);
    }

    public function check(Request $request)
    {
        try {
            //code...
            //throw $th;
            $user = User::find(Auth::user()->id);
            switch ($request['id']) {
                case 'daily':
                    $user->task_group = 'daily';
                    break;

                default:
                    if (Tgroup::where('id', $request['id'])->exists()) {
                        $user->task_group = $request['id'];
                    } else {
                        $user->task_group = 'daily';
                    }

                    break;
            }
            $user->save();
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
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
    public function destroy(string $id)
    {
        //
    }
}
