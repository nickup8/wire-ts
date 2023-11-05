export interface Supplier {
    id: number;
    code: string;
    name: string;
    created_at: Date;
}

export interface IInvoice {
    id: number;
    number: string;
    date: string;
    supplier: Supplier;
    user: {
        id: number;
        name: string;
        lastname: string;
    };
    created_at: Date;
}

export interface IInvoiceProps {
    file: Array<string>;
    invoices: IInvoice;
}

export interface Wire {
    id: number;
    material: string;
    hu: string;
    description: string;
    batch: string;
    qnt: string;
    invoice: IInvoice;
    supplier: Supplier;
    area: string;
    storage_bin: string;
    created_at: Date;
}

export interface IStorageBin {
    id: number;
    shelf: string;
    shelf_from: number;
    shelf_to: number;
    levels: number;
    count_shelfs: number;
}

export interface IStorageBinFedding {
    id: number;
    rack: string;
    shelf_from: number;
    shelf_to: number;
    level_from: number;
    level_to: number;
    count_shelfs: number;
}

export interface IMachine {
    id: number;
    number: string;
    name: string;
    created_at: Date;
}

export interface ISrorageFeeding {
    id: number;
    name: string;
    komax_id: number;
}

export interface IOrderFeeding {
    id: number;
    material: string;
    machine: IMachine;
}
