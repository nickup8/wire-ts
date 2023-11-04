import { useEffect, useState } from "react";
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

import { useForm } from "react-hook-form";

import { axiosClient } from "../../axiosClient";
import { useMachine } from "../../context/MachineContext";
import { IMachine, Wire } from "../typesAndInterfaces";
import { Preloader } from "../Preloader/Preloader";

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
export const KomaxOperator = () => {
    const [machine, setMachine] = useState<IMachine | null>(null);
    const [loading, setLoading] = useState(false);
    const { machine_id, updateMachine } = useMachine();
    const [orders, setOrders] = useState<Wire[] | null>(null);
    const form = useForm();
    const { register, handleSubmit, getValues, reset } = form;
    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/machines/${machine_id}`).then((response) => {
            setMachine(response.data.data);
            axiosClient
                .get("/orders_feeding_machine", {
                    params: {
                        machine_id: machine_id,
                    },
                })
                .then((resp) => {
                    setOrders(resp.data.data);
                    setLoading(false);
                });
        });
    }, []);

    const updateMachineButtonClick = () => {
        updateMachine();
        setOrders(null);
    };

    const onSubmit = async () => {
        try {
            const resp = await axiosClient.post("create_order_feeding", {
                machine_id: machine_id,
                material: getValues().material.toUpperCase(),
            });
            if (resp.status === 201) {
                if (orders) {
                    setOrders([...orders, resp.data.data]);
                }
                reset();
            }
        } catch (error) {}
    };

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <Box>
                    <Stack spacing={2}>
                        <Typography variant="h4" fontWeight="bold">
                            {machine?.number} - {machine?.name}
                        </Typography>
                        <Box>
                            <Button
                                variant="outlined"
                                onClick={updateMachineButtonClick}
                            >
                                Изменить машину
                            </Button>
                        </Box>
                    </Stack>
                    <Stack spacing={3} direction="row" sx={{ mt: 4 }}>
                        <Box sx={{ width: "450px" }} textAlign="center">
                            <Paper sx={{ p: 4 }}>
                                <Stack
                                    spacing={2}
                                    component="form"
                                    noValidate
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <Typography variant="h6">
                                        Заказать провод:
                                    </Typography>

                                    <TextField
                                        label="Введите номер материала"
                                        size="small"
                                        fullWidth
                                        {...register("material", {
                                            required: true,
                                        })}
                                    />

                                    <Box>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                        >
                                            Заказать
                                        </Button>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Paper sx={{ p: 4 }}>
                                <Typography variant="h6">
                                    Заказы проводов
                                </Typography>
                                {orders?.length ? (
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
                                                        Ячейка
                                                    </StyledTableCell>
                                                    <StyledTableCell
                                                        align="center"
                                                        sx={{
                                                            fontSize: "18px",
                                                        }}
                                                    >
                                                        Действие
                                                    </StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {orders.map((wire: Wire) => {
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
                                    <Typography variant="body1">
                                        Нет активных заказов
                                    </Typography>
                                )}
                            </Paper>
                        </Box>
                    </Stack>
                </Box>
            )}
        </>
    );
};
