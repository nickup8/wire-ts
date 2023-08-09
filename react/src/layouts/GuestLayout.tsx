import { useState } from "react";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Button,
    Alert,
    AlertTitle,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosClient } from "../axiosClient";
import { useAuth } from "../context/AutContext";

export const GuestLayout = () => {
    const form = useForm();
    const { register, getValues, handleSubmit } = form;

    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);

    const { user, csrfToken, setUser } = useAuth();

    const onSubmit = async () => {
        setSending(true);
        await csrfToken();
        try {
            const resp = await axiosClient.post("/login", {
                email: getValues("email"),
                password: getValues("password"),
            });
            if (resp.status === 200) {
                setUser(resp.data.user);
                return <Navigate to="/" />;
            }
        } catch (error: any) {
            if (error.response.status === 401) {
                setError(error.response.data.message);
                setSending(false);
            }
        }
    };

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                background: "#F7F9FC",
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            component="div"
        >
            <Box width={400}>
                <Typography
                    variant="h4"
                    component="h1"
                    align="center"
                    fontWeight="bold"
                    sx={{ mb: 2 }}
                >
                    Сиситема управления проводами
                </Typography>
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 2 }} align="center">
                        Вход в систему
                    </Typography>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            type="text"
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                            label="Логин"
                            {...register("email", {
                                required: "Логин обязательный",
                            })}
                        />
                        <TextField
                            type="password"
                            size="small"
                            fullWidth
                            sx={{ mb: 2 }}
                            label="Пароль"
                            {...register("password", {
                                required: "Пароль не должен быть пустым",
                            })}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={sending}
                        >
                            Войти
                        </Button>
                    </form>
                </Paper>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        <AlertTitle>Ошибка</AlertTitle>
                        {error}
                    </Alert>
                )}
            </Box>
        </Box>
    );
};
