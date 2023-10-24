<?php

namespace App\Http\Controllers;

use App\Http\Requests\MachineRequest;
use App\Http\Resources\MachineResource;
use App\Models\Machine;
use Illuminate\Http\Request;

class MachineController extends Controller
{
    public function create(MachineRequest $request)
    {
        $data = $request->validated();

        $machine = Machine::create(
            [
                "number" => $data['number'],
                "name" => $data['name'],
            ]
        );


        return new MachineResource($machine);
    }

    public function index()
    {
        return MachineResource::collection(Machine::all());
    }

    public function view(string $id)
    {
        return new MachineResource((Machine::findOrFail($id)));
    }
}
