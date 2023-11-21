import {
    Box,
    Typography,
    Paper,
    Divider,
    Stack,
    TextField,
    Button,
    Alert,
    IconButton,
    Snackbar,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosClient } from "../../axiosClient";
import CloseIcon from "@mui/icons-material/Close";

export const FeedingMoving = () => {
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [response, setResponse] = useState("");
    const form = useForm();
    const { register, getValues, handleSubmit, reset } = form;

    const onSubmit = async () => {
        try {
            const resp = await axiosClient.post("/create_wire_feeding", {
                hu: getValues("hu"),
                storage_bin_feeding: getValues("storage"),
            });
            if (resp.status === 200) {
                setResponse(resp.data.message);
                setOpen(true);
                setError(null);
                reset();
            }
        } catch (error: any) {
            setError(error.response.data.message);
        }
    };
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <Paper sx={{ p: 4, width: "350px" }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                    Перемещение проводов
                </Typography>
                <Divider />
                <Stack
                    spacing={1}
                    sx={{ mt: 2 }}
                    component="form"
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        label="Место хранения"
                        size="small"
                        {...register("storage", {
                            required: true,
                        })}
                    />
                    <TextField
                        label="Штрих код провода"
                        size="small"
                        {...register("hu", {
                            required: true,
                        })}
                    />
                    <Box>
                        <Button type="submit" variant="contained">
                            Переместить
                        </Button>
                    </Box>
                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}
                >
                    {response}
                </Alert>
            </Snackbar>
        </>
    );
};
