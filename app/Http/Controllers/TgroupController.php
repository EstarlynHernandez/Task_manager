<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tgroup;
use Illuminate\Support\Facades\Auth;

class TgroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        if(isset($request['gname']) && strlen($request['gname']) > 3){
            $Tgroup = new Tgroup;
            $Tgroup->name = htmlspecialchars($request['gname']);
            $Tgroup->user_id = Auth::user()->id;

            $Tgroup->save();
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
        //
    }
}
