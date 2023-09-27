<?php

namespace App\Imports;

use App\Models\Wire;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\Importable;



class WireImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */

    use Importable;

    public function model(array $row)
    {

        return new Wire([
            "material" => $row["material"],
            "hu" => $row["hu"],
            "description" => $row["description"],
            "qnt" => $row["qnt"],
        ]);
    }
}
