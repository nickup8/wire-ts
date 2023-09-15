<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\SupplierRequest;
use App\Http\Resources\SupplierResource;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        return SupplierResource::collection(Supplier::all());
    }

    public function create(SupplierRequest $request)
    {
        $data = $request->validated();

        $supplier = Supplier::create([
            'code' => $data['code'],
            'name' => $data['name'],
        ]);

        return $supplier;
    }
}
