import { styled, Box, Toolbar } from "@mui/material";
import { useAppSelector } from "../hooks";

import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    background: "#F7F9FC",
    height: "100vh",
    padding: theme.spacing(5),
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

export const Logistic = () => {
    const open = useAppSelector((state) => state.drawer.open);

    return (
        <Box sx={{ display: "flex" }}>
            <Header />
            <Sidebar />
            <Main
                open={open}
                sx={{
                    px: 8,
                    pb: 2,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Toolbar />
                <Box sx={{ flex: 1 }}>
                    <Outlet />
                </Box>
                <Footer />
            </Main>
        </Box>
    );
};
