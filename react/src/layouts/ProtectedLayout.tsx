import { useEffect } from "react";
import { useAuth } from "../context/AutContext";
import { Navigate, Route, Routes } from "react-router-dom";
import { axiosClient } from "../axiosClient";
import { Logistic } from "./Logistic";
import { Feeding } from "./Feeding";
import { Komax } from "./Komax";
import { Warehouse } from "./Warehouse";
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

    // renderSwitch(user.rule_id) {
    //     switch ( expression ) {
    //         case value1:
    //             // statement 1
    //             break;
    //         case value2:
    //             // statement 2
    //             break;
    //         case valueN:
    //             // statement N
    //             break;
    //         default:
    //             //
    //             break;
    //      }
    // }

    if (user.rule_id === 1) {
        return (
            <Routes>
                <Route path="/" element={<Logistic />}></Route>
            </Routes>
        );
    }
    if (user.rule_id === 2) {
        return <Warehouse />;
    }
    if (user.rule_id === 3) {
        return <Feeding />;
    }
    if (user.rule_id === 4) {
        return <Komax />;
    }
};
