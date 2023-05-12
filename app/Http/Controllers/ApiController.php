<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Error;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (Auth::attempt($credentials)) {
                // $request->session()->regenerate();
                $token = Auth::user()->createToken('estyos task')->plainTextToken;
                return response()->json([
                    'error' => false,
                    'token' => $token,
                ]);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'your email or password are wrong',
                    'type' => 'credentials'
                ])->header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');;
            }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => true,
                'type' => 'field'
            ]);
        }
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
        //
    }
}
