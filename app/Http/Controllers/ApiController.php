<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Validation\ValidationException;
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
                $tokenDel = Auth::user()->tokens()
                    ->where('name', 'estyos Task')
                    ->first();
                $tokenDel->delete();
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
        try {
            //code...
            $userData = $request->validate([
                'name' => ['required', 'max:20', 'regex:/^[\pL\s\d]+$/u'],
                'lastname' => ['required', 'max:20', 'regex:/^[\pL\s\d]+$/u'],
                'username' => ['required', 'max:20', 'regex:/^[\pL\s\d]+$/u'],
                'email' => ['required', 'email'],
                'password' => ['required', 'max:64', 'min:8'],
                'repeatPassword' => ['required', 'same:password'],
            ]);

            $user = new User();
            $user->name = $userData['name'];
            $user->lastname = $userData['lastname'];
            $user->username = $userData['username'];
            $user->email = $userData['email'];
            $user->password = $userData['password'];

            $user->save();

            $token = $user->createToken('estyos Task')->plainTextToken;

            return response()->json(['error' => false, 'token' => $token]);
        } catch (ValidationException $e) {
            return response()->json(['error' => true, 'type' => 'field', 'errors' => $e->errors()]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['error' => true, 'type' => 'generic']);
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
        //
    }
}
