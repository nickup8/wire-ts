import { Box, Paper, Typography } from "@mui/material";
import { useAuth } from "../context/AutContext";
import logo from "../logo.svg";

export const Welcom = () => {
    const { user } = useAuth();
    return (
        <Paper
            sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box textAlign="center">
                <img src={logo} alt="Yazaki Volga" width="300px" />
                <Typography variant="h5">Международная компания</Typography>
                <Typography variant="h5">
                    Производитель автомобильных жгутов проводов
                </Typography>
            </Box>
        </Paper>
    );
};
