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
