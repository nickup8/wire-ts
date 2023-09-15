<?php

namespace App\Http\Controllers\v1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\RuleResource;
use App\Models\Rule;

class RuleController extends Controller
{
    public function index()
    {
        return RuleResource::collection(Rule::all());
    }
}
