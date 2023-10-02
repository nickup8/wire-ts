<?php

namespace App\Http\Controllers\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\InvoiseRequest;
use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return InvoiceResource::collection(Invoice::all());
    }

    public function create(InvoiseRequest $request)
    {
        $data = $request->validated();

        $invoice = Invoice::create([
            "number" => $data["number"],
            "date" => $data["date"],
            "supplier_id" => $data["supplier_id"],
            "user_id" => $data["user_id"],
        ]);

        return response()->json([
            'invoice' => new InvoiceResource($invoice)
        ]);
    }
}
