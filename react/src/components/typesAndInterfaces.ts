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
