import { useEffect } from "react";
import { useAuth } from "../context/AutContext";
import { Navigate } from "react-router-dom";
import { axiosClient } from "../axiosClient";
export const ProtectedLayout = () => {
    const { user, setUser } = useAuth();
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
    if (!user) {
        return <Navigate to="/login" />;
    }
    return <div>{user.name}</div>;
};
