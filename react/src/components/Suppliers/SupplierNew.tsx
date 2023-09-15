import {
    Paper,
    Typography,
    Button,
    Box,
    Divider,
    Stack,
    TextField,
    Alert,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosClient } from "../../axiosClient";
import { useNavigate, Navigate } from "react-router-dom";

export const SupplierNew = () => {
    const [errorsBacked, setErrorsBackend] = useState([]);
    const form = useForm();

    const { register, formState, handleSubmit, getValues } = form;

    const { errors } = formState;

    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            const resp = await axiosClient.post("/suppliers", {
                code: getValues("code"),
                name: getValues("name"),
            });
            if (resp.status === 200) {
                <Navigate to="/suppliers" />;
            }
        } catch (error: any) {
            if (error.status === 401) {
                setErrorsBackend(error.response.data.message);
            } else if (error.response.status === 422) {
                setErrorsBackend(error.response.data.message);
            }
        }
    };

    return (
        <Paper sx={{ p: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                    Добавить нового поставщика
                </Typography>
            </Box>
            <Divider />
            <Box
                component="form"
                noValidate
                sx={{ mt: 2 }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack spacing={2} direction="row">
                    <TextField
                        variant="outlined"
                        label="Код"
                        size="small"
                        fullWidth
                        {...register("code", {
                            required: "Заполните код поставщика",
                        })}
                        error={!!errors.code}
                        helperText={errors.code ? errors.code.message : ""}
                    />
                    <TextField
                        variant="outlined"
                        label="Наименование"
                        size="small"
                        fullWidth
                        {...register("name", {
                            required: "Заполните наименование поставщика",
                        })}
                        error={!!errors.name}
                        helperText={errors.name ? errors.name.message : ""}
                    />
                </Stack>
                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Добавить
                </Button>
            </Box>
            {errorsBacked.length > 0 && (
                <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                    {errorsBacked}
                </Alert>
            )}
        </Paper>
    );
};
