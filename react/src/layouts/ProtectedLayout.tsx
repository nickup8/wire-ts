import { useEffect } from "react";
import { useAuth } from "../context/AutContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { axiosClient } from "../axiosClient";

export const ProtectedLayout = () => {
    const { user, setUser } = useAuth();

    const location = useLocation();

    useEffect(() => {
        (async () => {
            try {
                const resp = await axiosClient.get("/user");
                if (resp.status === 200) {
                    setUser(resp.data.data);
                }
            } catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                }
            }
        })();
    }, []);

    return user ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
