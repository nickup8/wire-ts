import { useEffect, useState } from "react";

import {
    Box,
    Stack,
    Paper,
    Button,
    Typography,
    IconButton,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    styled,
    tableCellClasses,
    TextField,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Link } from "react-router-dom";
import { axiosClient } from "../../axiosClient";
import { Preloader } from "../Preloader/Preloader";
import { IMachine } from "../typesAndInterfaces";
import { useForm } from "react-hook-form";

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

export const Machines = () => {
    const [machines, setMachines] = useState<IMachine[]>([]);
    const [loading, setLoading] = useState(false);

    const form = useForm();

    const { register, handleSubmit, getValues, resetField } = form;

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/machines").then((response) => {
            setMachines(response.data.data);
            setLoading(false);
        });
    }, []);

    const onSubmit = async () => {
        try {
            const resp = await axiosClient.post("/machine_new", {
                name: getValues().name,
                number: getValues().number,
            });
            if (resp.status === 201) {
                setMachines([...machines, resp.data.data]);
            }
        } catch (error) {}
    };

    return (
        <>
            {!loading ? (
                <Box sx={{ height: "100%" }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                        Оборудование
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Box sx={{ width: "420px" }}>
                            <Paper sx={{ p: 2, textAlign: "center" }}>
                                <Typography
                                    variant="h6"
                                    sx={{ mb: 2 }}
                                    fontWeight="bold"
                                >
                                    Добавить оборудование
                                </Typography>
                                <Stack
                                    spacing={1}
                                    component="form"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <TextField
                                        type="text"
                                        label="Номер"
                                        size="small"
                                        fullWidth
                                        {...register("number", {
                                            required: true,
                                        })}
                                    />
                                    <TextField
                                        type="text"
                                        label="Название (модель)"
                                        size="small"
                                        fullWidth
                                        {...register("name", {
                                            required: true,
                                        })}
                                    />
                                    <Box>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                        >
                                            Добавить
                                        </Button>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Box>
                        <Paper sx={{ p: 2, width: "100%" }}>
                            <TableContainer sx={{ mt: 2 }}>
                                <Table aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell
                                                align="center"
                                                sx={{ fontSize: "18px" }}
                                            >
                                                Номер машины
                                            </StyledTableCell>

                                            <StyledTableCell
                                                align="center"
                                                sx={{ fontSize: "18px" }}
                                            >
                                                Наименовани (модель)
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                sx={{ fontSize: "18px" }}
                                            >
                                                Дата создания
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                sx={{ fontSize: "18px" }}
                                            >
                                                Действия
                                            </StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {machines.map((machine: IMachine) => {
                                            return (
                                                <StyledTableRow
                                                    key={machine.id}
                                                >
                                                    <StyledTableCell
                                                        align="center"
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {machine.number}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {machine.name}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        {new Date(
                                                            machine.created_at
                                                        ).toLocaleString(
                                                            "ru-RU",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                                hour: "numeric",
                                                                minute: "numeric",
                                                            }
                                                        )}
                                                    </StyledTableCell>
                                                    <StyledTableCell align="center">
                                                        <IconButton
                                                            component={Link}
                                                            to={`/machines/${machine.id}`}
                                                        >
                                                            <SettingsOutlinedIcon />
                                                        </IconButton>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Stack>
                </Box>
            ) : (
                <Preloader />
            )}
        </>
    );
};
