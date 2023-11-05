<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderFeedingRequest;
use App\Http\Requests\OrdersMachineRequest;
use App\Http\Requests\DeleteOrderFeedingRequest;
use App\Http\Resources\OrderFeedingResource;
use App\Models\OrderFeeding;
use Illuminate\Http\Request;

class OrderFeedingController extends Controller
{
    public function create(OrderFeedingRequest $request)
    {
        $data = $request->validated();
        $order = OrderFeeding::create([
            "material" => $data["material"],
            "machine_id" => $data["machine_id"],
        ]);
        return new OrderFeedingResource($order);
    }

    public function orders_machine(OrdersMachineRequest $request)
    {
        $data = $request->validated();
        return OrderFeedingResource::collection(OrderFeeding::all()->where("machine_id", "=", $data["machine_id"]));
    }
    public function index()
    {
        return OrderFeedingResource::collection(OrderFeeding::all());
    }
    public function delete(DeleteOrderFeedingRequest $request)
    {
        $data = $request->validated();
        $order = OrderFeeding::find($data["id"]);
        $order->delete();
        return OrderFeedingResource::collection(OrderFeeding::all()->where("machine_id", "=", $data["machine_id"]));
    }
}
