<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStorageBinFeedingListRequest;
use App\Http\Requests\UpdateStorageBinFeedingListRequest;
use App\Http\Resources\StorageBinFeedingListResource;

use App\Models\StorageBinFeedingList;

class StorageBinFeedingListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StorageBinFeedingListResource::collection(StorageBinFeedingList::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(StoreStorageBinFeedingListRequest $request)
    {
        $data = $request->validated();
        $storage = StorageBinFeedingList::create([
            'rack' => $data["rack"],
            "shelf_from" => $data["shelf_from"],
            "shelf_to" => $data["shelf_to"],
            "level_from" => $data["level_from"],
            "level_to" => $data["level_to"],
            "count_shelfs" => $data["count_shelfs"],
        ]);
        return $storage;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStorageBinFeedingListRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StorageBinFeedingList $storageBinFeedingList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StorageBinFeedingList $storageBinFeedingList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStorageBinFeedingListRequest $request, StorageBinFeedingList $storageBinFeedingList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StorageBinFeedingList $storageBinFeedingList)
    {
        //
    }
}
