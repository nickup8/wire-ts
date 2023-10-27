import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Preloader } from "../Preloader/Preloader";
import { useForm, useFieldArray } from "react-hook-form";
import {
    Box,
    Typography,
    Paper,
    Stack,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axiosClient } from "../../axiosClient";
import { IMachine, ISrorageFeeding } from "../typesAndInterfaces";

export const MachineSetting = () => {
    const [loading, setLoading] = useState(false);
    const [machine, setMachine] = useState<IMachine | null>(null);
    const [shelfs, setShelfs] = useState<any>([]);
    const form = useForm({
        defaultValues: {
            storageBin: [{ name: "" }],
        },
    });
    const { id } = useParams();

    const { register, getValues, control, handleSubmit } = form;
    const [storageBinFeedin, setStorageBinFeeding] = useState<
        ISrorageFeeding[]
    >([]);

    useEffect(() => {
        setLoading(true);
        axiosClient.get(`machines/${id}`).then((response) => {
            setMachine(response.data.data);
            axiosClient
                .get("bind_shelfs_feeding", {
                    params: { machine_id: id },
                })
                .then((response) => {
                    setShelfs(response.data.data);
                    setLoading(false);
                });
        });
    }, []);

    const { fields, append, remove } = useFieldArray({
        name: "storageBin",
        control,
    });

    const onSubmit = async () => {
        setLoading(true);
        try {
            const resp = await axiosClient.post("storage_bin_feeding_machine", {
                storage_bin: getValues().storageBin,
                machine_id: id,
            });
            if (resp.status === 200) {
                setShelfs([...shelfs, resp.data.data]);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };
    console.log(shelfs);

    return (
        <>
            {!loading ? (
                <Box>
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{ mb: 2 }}
                            fontWeight="bold"
                        >
                            Машина номер: {machine?.number}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{ mb: 2 }}
                            fontWeight="bold"
                        >
                            Название: {machine?.name}
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Box sx={{ width: "450px" }}>
                            <Paper sx={{ p: 2, width: "100%" }}>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Привязать рабочие ячейки
                                </Typography>
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                >
                                    <Stack spacing={1}>
                                        {fields.map((field, index) => {
                                            return (
                                                <FormControl
                                                    variant="outlined"
                                                    size="small"
                                                    sx={{ mb: 2 }}
                                                    key={field.id}
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-password">
                                                        Ячейка
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-password"
                                                        type="text"
                                                        {...register(
                                                            `storageBin.${index}.name`
                                                        )}
                                                        endAdornment={
                                                            index > 0 && (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        edge="end"
                                                                        size="small"
                                                                        onClick={() =>
                                                                            remove(
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        <CloseIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )
                                                        }
                                                        label="Ячейка"
                                                    />
                                                </FormControl>
                                            );
                                        })}
                                    </Stack>
                                    <Stack
                                        component="div"
                                        direction="row"
                                        spacing={2}
                                        sx={{ mt: 2 }}
                                    >
                                        <Box>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                            >
                                                Привязать
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button
                                                variant="outlined"
                                                onClick={() =>
                                                    append({ name: "" })
                                                }
                                            >
                                                Добавить ячейку
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Paper>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Привязанные ячейки:
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    {shelfs.length > 0 ? (
                                        shelfs.map((shelf: any) => {
                                            return (
                                                <Typography variant="body1">
                                                    {shelf.name}
                                                </Typography>
                                            );
                                        })
                                    ) : (
                                        <Typography variant="body1">
                                            Нет привязанных ячеек
                                        </Typography>
                                    )}
                                </Stack>
                            </Paper>
                        </Box>
                    </Stack>
                </Box>
            ) : (
                <Preloader />
            )}
        </>
    );
};
