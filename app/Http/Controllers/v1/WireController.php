<?php

namespace App\Http\Controllers\V1;

use App\Http\Controllers\Controller;
use App\Imports\WireImport;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Facades\Excel;

class WireController extends Controller
{
    public function import(Request $request)
    {

        // $wires = Excel::toCollection(new WireImport, $request->file('invoice'));
        $collection = (new WireImport)->toCollection($request->file('invoice'));
        return $collection[0];
    }
}
