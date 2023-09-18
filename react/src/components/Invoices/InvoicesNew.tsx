import { useEffect, useState } from "react";
import {
    Paper,
    Typography,
    Button,
    Box,
    Divider,
    Stack,
    TextField,
    Alert,
    Autocomplete,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ru from "date-fns/locale/ru";
import { useForm, Controller } from "react-hook-form";
import { axiosClient } from "../../axiosClient";
import { Navigate } from "react-router-dom";
import { Supplier } from "../typesAndInterfaces";

export const InvoicesNew = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [errorsBacked, setErrorsBackend] = useState([]);
    const form = useForm();

    const { register, formState, handleSubmit, getValues, control } = form;

    const { errors } = formState;

    useEffect(() => {
        try {
            axiosClient.get("/suppliers").then((resp) => {
                setSuppliers(resp.data.data);
            });
        } catch (error) {}
    }, []);

    const onSubmit = async () => {
        try {
            const resp = await axiosClient.post("/suppliers", {
                code: getValues("number"),
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
                    Загрузить накладную
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
                        label="Номер накладной"
                        size="small"
                        {...register("number", {
                            required: "Заполните номер накладной",
                        })}
                        error={!!errors.code}
                        helperText={errors.code ? errors.code.message : ""}
                    />

                    <Controller
                        control={control}
                        name="ReactDatepicker"
                        render={({ field: { value, ...fieldProps } }) => {
                            return (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                    adapterLocale={ru}
                                >
                                    <DatePicker
                                        {...fieldProps}
                                        label="Дата накладной"
                                        slotProps={{
                                            textField: { size: "small" },
                                        }}
                                    />
                                </LocalizationProvider>
                            );
                        }}
                    />
                    <Autocomplete
                        id="code_supplier"
                        getOptionLabel={(option) =>
                            `${option.code} - ${option.name}`
                        }
                        options={suppliers}
                        sx={{ width: 300 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Код поставщика"
                                size="small"
                            />
                        )}
                    />
                    <TextField type="file" size="small" />
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
