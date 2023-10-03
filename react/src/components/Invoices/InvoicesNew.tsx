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
    MenuItem,
    FormControl,
    FormHelperText,
    Select,
    InputLabel,
    SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ru from "date-fns/locale/ru";
import { useForm, Controller } from "react-hook-form";
import { axiosClient } from "../../axiosClient";
import { IInvoice, Supplier } from "../typesAndInterfaces";
import { useAuth } from "../../context/AutContext";
import { Invoice } from "./Invoice";

export const InvoicesNew = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [supplier_id, setSupplier_id] = useState("");
    const [errorsBacked, setErrorsBackend] = useState([]);
    const [creatingInvoice, setCreatingInvoices] = useState<IInvoice[]>([]);
    const [invoice, setInvoice] = useState(false);
    const form = useForm();
    const { user } = useAuth();

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
            const resp = await axiosClient.post("/invoice", {
                number: getValues("number"),
                date: getValues("ReactDatepicker").toLocaleString("ru-RU", {
                    day: "numeric",
                    month: "numeric",
                    year: "numeric",
                }),
                supplier_id: getValues("supplier_id"),
                user_id: user?.id,
            });
            if (resp.status === 200) {
                setCreatingInvoices(resp.data.invoice);
                setInvoice(true);
            }
        } catch (error: any) {
            if (error.status === 401) {
                setErrorsBackend(error.response.message);
            } else if (error.status === 422) {
                setErrorsBackend(error.response.message);
            }
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setSupplier_id(event.target.value as string);
    };

    return (
        <>
            {!invoice ? (
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
                                fullWidth
                                variant="outlined"
                                label="Номер накладной"
                                size="small"
                                {...register("number", {
                                    required: "Заполните номер накладной",
                                })}
                                error={!!errors.code}
                                helperText={
                                    errors.code ? errors.code.message : ""
                                }
                            />

                            <Controller
                                control={control}
                                name="ReactDatepicker"
                                render={({
                                    field: { value, ...fieldProps },
                                }) => {
                                    return (
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                            adapterLocale={ru}
                                        >
                                            <DatePicker
                                                sx={{ width: "100%" }}
                                                {...fieldProps}
                                                label="Дата накладной"
                                                slotProps={{
                                                    textField: {
                                                        size: "small",
                                                    },
                                                }}
                                            />
                                        </LocalizationProvider>
                                    );
                                }}
                            />
                            <Controller
                                render={({ field }) => (
                                    <FormControl
                                        fullWidth
                                        size="small"
                                        error={!!errors.rule_id}
                                    >
                                        <InputLabel>Поставщик</InputLabel>
                                        <Select
                                            {...field}
                                            label="Поставщик"
                                            {...register("supplier_id", {
                                                required: "Выберите поставщика",
                                            })}
                                            onChange={handleChange}
                                            value={supplier_id}
                                        >
                                            {suppliers.map(
                                                (supplier: Supplier) => {
                                                    return (
                                                        <MenuItem
                                                            key={supplier.id}
                                                            value={supplier.id}
                                                        >
                                                            {`${supplier.code} - ${supplier.name}`}
                                                        </MenuItem>
                                                    );
                                                }
                                            )}
                                        </Select>
                                        <FormHelperText>
                                            {/* {errors.rule_id?.message} */}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                                name="Select"
                                control={control}
                            />

                            <TextField
                                fullWidth
                                type="file"
                                size="small"
                                {...register("invoice")}
                            />
                        </Stack>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ mt: 2 }}
                        >
                            Добавить
                        </Button>
                    </Box>
                    {errorsBacked.length > 0 && (
                        <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                            {errorsBacked}
                        </Alert>
                    )}
                </Paper>
            ) : (
                <Invoice
                    file={getValues("invoice")}
                    invoice={creatingInvoice}
                />
            )}
        </>
    );
};
