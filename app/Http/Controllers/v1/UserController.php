<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\UserResource;
use App\Models\Rule;

class UserController extends Controller
{
    public function index()
    {
        // $users = User::find(2);

        return UserResource::collection(User::all());
    }
}
