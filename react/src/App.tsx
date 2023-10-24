import { Route, Routes } from "react-router-dom";
import "./App.css";
import { GuestLayout } from "./layouts/GuestLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { Users } from "./components/Users/Users";
import { ErrorPage } from "./layouts/ErrorPage";
import { Logistic } from "./layouts/Logistic";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { NewUser } from "./components/Users/NewUser";
import { Suppliers } from "./components/Suppliers/Suppliers";
import { SupplierNew } from "./components/Suppliers/SupplierNew";
import { Invoices } from "./components/Invoices/Invoices";
import { InvoicesNew } from "./components/Invoices/InvoicesNew";
import { StorageBinWarehouse } from "./components/Storage_bin/StorageBinWarehouse";
import { StorageBinFeeding } from "./components/Storage_bin/StorageBinFeeding";
import { Machines } from "./components/Machines/Machines";
import { Preloader } from "./components/Preloader/Preloader";
import { Acceptance } from "./components/Acceptance/Acceptance";
import { Warehouse } from "./components/Warehouse/Warehouse";
import { FeedingBuffer } from "./components/Feeding/FeedingBuffer";
import { MachineSetting } from "./components/Machines/MachineSetting";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<GuestLayout />} />
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Logistic />}>
                    <Route index path="/" element={<Dashboard />} />
                    <Route index path="/warehouse" element={<Warehouse />} />
                    <Route
                        index
                        path="/warehouse/acceptance"
                        element={<Acceptance />}
                    />
                    <Route
                        index
                        path="/feeding/buffer"
                        element={<FeedingBuffer />}
                    />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/new" element={<NewUser />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/suppliers/new" element={<SupplierNew />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/invoices/new" element={<InvoicesNew />} />
                    <Route
                        path="/storage_bin_warehouse"
                        element={<StorageBinWarehouse />}
                    />
                    <Route
                        path="/storage_bin_feeding"
                        element={<StorageBinFeeding />}
                    />
                    <Route path="/machines" element={<Machines />} />
                    <Route path="/machines/:id" element={<MachineSetting />} />
                    <Route path="/load" element={<Preloader />} />
                </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
