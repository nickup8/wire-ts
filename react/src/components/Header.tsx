import { useState } from "react";
import {
    useTheme,
    AppBar,
    CssBaseline,
    Box,
    Avatar,
    Toolbar,
    Typography,
    IconButton,
    Divider,
    Stack,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../logo.svg";
import { useAppDispatch } from "../hooks";
import { openDrawer } from "../store/drawerSlice";
import { useAuth } from "../context/AutContext";
import { axiosClient } from "../axiosClient";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [setings, setSetings] = useState(false);
    const { user } = useAuth();
    const handleLogout = async () => {
        setSetings(true);
        try {
            const resp = await axiosClient.post("/logout");

            if (resp.status === 200) {
                localStorage.removeItem("user");
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            setSetings(false);
        }
    };

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    boxShadow: "none",
                    backgroundColor: "#fff",
                    color: "#212121",
                }}
            >
                <Toolbar sx={{ display: "flex" }}>
                    <Box>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => dispatch(openDrawer())}
                            edge="start"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <img src={logo} alt="Yazaki Russia logo" width={140} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar></Avatar>
                        <Typography>{user?.name}</Typography>
                        <Button
                            variant="contained"
                            onClick={handleLogout}
                            disabled={setings}
                        >
                            Выход
                        </Button>
                    </Stack>
                </Toolbar>
                <Divider />
            </AppBar>
        </>
    );
};
