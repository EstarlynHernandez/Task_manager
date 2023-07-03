<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use DateTime;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
                if (isset($request['device'])) {
                    $deviceName = $request['device'];
                    $tokenDel = Auth::user()->tokens()
                        ->where('name', $request['device'])
                        ->first();
                    if ($tokenDel) {
                        $tokenDel->delete();
                    }
                    $token = Auth::user()->createToken($request['device'])->plainTextToken;
                } else {
                    $deviceName = 'Device' . random_int(00001, 99999) . (new DateTime())->format('dmyhms');
                    $token = Auth::user()->createToken($deviceName)->plainTextToken;
                }
                return response()->json([
                    'error' => false,
                    'token' => $token,
                    'deviceName' => $deviceName,
                ]);
            } else {
                return response()->json([
                    'error' => true,
                    'message' => 'your email or password are wrong',
                    'type' => 'credentials',
                ]);
            }
        } catch (\Throwable $th) {
            return response()->json([
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
            $user->password = Hash::make($userData['password']);
            if ($request['device']) {
                $deviceName = $request['device'];
            } else {
                $deviceName = 'Device' . random_int(00001, 99999) . (new DateTime())->format('dmyhms');
            }

            $user->save();

            $token = $user->createToken($deviceName)->plainTextToken;

            return response()->json(['error' => false, 'token' => $token, 'deviceName' => $deviceName]);
        } catch (ValidationException $e) {
            return response()->json(['error' => true, 'type' => 'field', 'errors' => $e->errors()]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json(['type' => 'generic']);
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
