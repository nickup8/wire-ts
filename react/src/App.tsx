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

function App() {
    return (
        <Routes>
            <Route path="/login" element={<GuestLayout />} />
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Logistic />}>
                    <Route index path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/new" element={<NewUser />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                    <Route path="/suppliers/new" element={<SupplierNew />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/invoices/new" element={<InvoicesNew />} />
                </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
