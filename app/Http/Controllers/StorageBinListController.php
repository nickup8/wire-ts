<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorageBinListRequest;
use App\Http\Resources\StorageBinListResource;
use App\Models\StorageBinList;
use Illuminate\Http\Request;

class StorageBinListController extends Controller
{
    public function create(StorageBinListRequest $request)
    {
        $data = $request->validated();
        $storage = StorageBinList::create([
            "shelf" => $data["shelf"],
            "shelf_from" => $data['shelf_from'],
            "shelf_to" => $data['shelf_to'],
            "levels" => $data['levels'],
            "count_shelfs" => $data['count_shelfs'],
        ]);

        return $storage;
    }

    public function index()
    {
        return StorageBinListResource::collection(StorageBinList::all());
    }
}
