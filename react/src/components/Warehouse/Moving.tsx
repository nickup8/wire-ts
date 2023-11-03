import {
    Paper,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    styled,
    TableContainer,
    TableCell,
    tableCellClasses,
    TableRow,
    Table,
    TableHead,
    TableBody,
    Alert,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosClient } from "../../axiosClient";
import { Wire } from "../typesAndInterfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#34495E",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export const Moving = () => {
    const [wires, setWires] = useState<Wire[]>([]);
    const form = useForm();
    const [disabled, setDisabled] = useState(false);
    const [errors, setErrors] = useState("");
    const [errorWires, setErrorWires] = useState("");
    const { register, handleSubmit, getValues, resetField } = form;
    let wire: any = [];
    const WireField = () => {
        for (let i = wires.length; i < 6; i++) {
            wire.push(i);
        }
    };
    WireField();
    const onSubmitStarageBin = async () => {
        setErrors("");
        try {
            const resp = await axiosClient.post("/storage_bin_warehouse", {
                storage_bin: getValues("storage_bin"),
            });
            if (resp.status === 200) {
                setWires(resp.data.data);
                setDisabled(true);
                WireField();
            }
        } catch (error: any) {
            if (error.response.status === 404) {
                setErrors(error.response.data.message);
            }
        }
    };

    const onCancel = () => {
        setDisabled(false);
        resetField("storage_bin");
    };

    const UpdateStorageWires = async () => {
        try {
            const resp = await axiosClient.post("/update_storage_bin_wire", {
                storage_bin: getValues().storage_bin,
                wires: getValues().wires,
            });
            if (resp.status === 200) {
                setWires(resp.data.data);
                resetField("wires");
            }

            console.log(getValues());
        } catch (error: any) {
            if (error.status === 422) {
                wires
                    ? setErrorWires("Провода не найдены")
                    : setErrorWires("Введите hu хотябы одного провода");
            }
        }
    };

    return (
        <>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Перемещение по местам хранения - склад
            </Typography>
            <Stack spacing={4} direction="row">
                <Stack spacing={4}>
                    <Box sx={{ width: "350px" }} textAlign="center">
                        <Paper sx={{ p: 4 }}>
                            <Stack
                                component="form"
                                noValidate
                                onSubmit={handleSubmit(onSubmitStarageBin)}
                                spacing={2}
                            >
                                <Typography variant="h6">Введите МХ</Typography>
                                <TextField
                                    label="Место хранения"
                                    size="small"
                                    {...register("storage_bin", {
                                        required: true,
                                    })}
                                    disabled={disabled}
                                />
                                <Box>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="center"
                                    >
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            disabled={disabled}
                                        >
                                            Подтвердить
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            disabled={!disabled}
                                            onClick={onCancel}
                                        >
                                            Отмена
                                        </Button>
                                    </Stack>
                                </Box>
                                {errors && (
                                    <Alert severity="error">{errors}</Alert>
                                )}
                            </Stack>
                        </Paper>
                    </Box>

                    {disabled && (
                        <Box sx={{ width: "350px" }} textAlign="center">
                            <Paper sx={{ p: 4 }}>
                                {wires.length < 6 ? (
                                    <Box>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            Введите HU проводов
                                        </Typography>
                                        <Stack
                                            spacing={2}
                                            component="form"
                                            noValidate
                                            onSubmit={handleSubmit(
                                                UpdateStorageWires
                                            )}
                                        >
                                            {wire.map(
                                                (field: any, index: any) => {
                                                    return (
                                                        <TextField
                                                            key={`${index}_${field}`}
                                                            label={`HU провода ${
                                                                wires.length +
                                                                index +
                                                                1
                                                            }`}
                                                            {...register(
                                                                `wires.${index}`
                                                            )}
                                                        />
                                                    );
                                                }
                                            )}
                                            <Box>
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                >
                                                    Переместить
                                                </Button>
                                            </Box>
                                        </Stack>
                                    </Box>
                                ) : (
                                    <Typography>Нет свободных мест</Typography>
                                )}
                            </Paper>
                        </Box>
                    )}
                </Stack>
                {disabled && (
                    <>
                        <Box sx={{ width: "100%" }}>
                            <Paper sx={{ p: 4 }}>
                                <Typography variant="h6">
                                    Место хранения: {getValues("storage_bin")}
                                </Typography>
                                <Typography variant="body1">
                                    {`Количество проводов ${wires.length}/6`}
                                </Typography>
                                {wires.length > 0 ? (
                                    <TableContainer sx={{ mt: 2 }}>
                                        <Table aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        Материал
                                                    </StyledTableCell>

                                                    <StyledTableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        Описание
                                                    </StyledTableCell>
                                                    <StyledTableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        HU
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {wires.map((wire: Wire) => {
                                                    return (
                                                        <StyledTableRow
                                                            key={wire.id}
                                                        >
                                                            <StyledTableCell
                                                                align="center"
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                {wire.material}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    wire.description
                                                                }
                                                            </StyledTableCell>

                                                            <StyledTableCell align="center">
                                                                {wire.hu}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        sx={{ height: "100%" }}
                                    >
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                        >
                                            Место {getValues("storage_bin")}{" "}
                                            свободное
                                        </Typography>
                                    </Box>
                                )}
                            </Paper>
                        </Box>
                        {errorWires && (
                            <Alert severity="error">{errorWires}</Alert>
                        )}
                    </>
                )}
            </Stack>
        </>
    );
};
