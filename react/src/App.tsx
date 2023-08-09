import { Route, Routes } from "react-router-dom";
import "./App.css";
import { GuestLayout } from "./layouts/GuestLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<GuestLayout />} />
            <Route path="/" element={<ProtectedLayout />} />
        </Routes>
    );
}

export default App;
