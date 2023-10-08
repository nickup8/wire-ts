import { useEffect, useState } from "react";
import { useAuth } from "../context/AutContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { axiosClient } from "../axiosClient";
import { Preloader } from "../components/Preloader/Preloader";

export const ProtectedLayout = () => {
    const { user, setUser } = useAuth();
    const [load, setLoad] = useState(false);

    const location = useLocation();

    useEffect(() => {
        (async () => {
            try {
                const resp = await axiosClient.get("/user");
                if (resp.status === 200) {
                    setUser(resp.data.data);
                    setLoad(true);
                }
            } catch (error: any) {
                if (error.response.status === 401) {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                    setLoad(true);
                }
            }
        })();
    }, []);

    return user ? (
        <>{load ? <Outlet /> : <Preloader />}</>
    ) : (
        <>
            {load ? (
                <Navigate to="/login" state={{ from: location }} replace />
            ) : (
                <Preloader />
            )}
        </>
    );
};
