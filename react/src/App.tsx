import { Route, Routes } from "react-router-dom";
import "./App.css";
import { GuestLayout } from "./layouts/GuestLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { Users } from "./components/Users/Users";
import { ErrorPage } from "./layouts/ErrorPage";
import { Logistic } from "./layouts/Logistic";
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<GuestLayout />} />
            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<Logistic />}>
                    <Route index path="/" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                </Route>
            </Route>
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
