import React, { useState } from "react";

import {
    Box,
    Stack,
    Paper,
    Button,
    Typography,
    Divider,
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

import { useForm } from "react-hook-form";
import { axiosClient } from "../../axiosClient";

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
export const StorageBinWarehouse = () => {
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const form = useForm();

    const { register, handleSubmit, getValues } = form;

    const onSubmit = async () => {
        setLoading(true);
        try {
            const resp = await axiosClient.post("/storage_bin", {
                shelf: getValues("shelf"),
                shelf_from: getValues("shelf_from"),
                shelf_to: getValues("shelf_to"),
                levels: getValues("levels"),
            });
            if (resp.status === 200) {
                console.log(resp.data);
                setCount(resp.data);
                console.log(count * 6);
            }
        } catch (error: any) {}
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Места хранения на складе
            </Typography>

            <Stack direction="row" spacing={2}>
                <Paper sx={{ p: 2, width: "420px", textAlign: "center" }}>
                    <Typography variant="h6" sx={{ mb: 2 }} fontWeight="bold">
                        Добавить МХ
                    </Typography>
                    <Stack
                        spacing={1}
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <TextField
                            type="number"
                            label="Номер стелажа"
                            size="small"
                            fullWidth
                            {...register("shelf", {
                                required: "Введите номер стелажа",
                            })}
                        />
                        <TextField
                            type="number"
                            label="Начальное МХ"
                            size="small"
                            fullWidth
                            {...register("shelf_from", {
                                required: "Введите начальное место хранения",
                            })}
                        />
                        <TextField
                            type="number"
                            label="Конечное МХ"
                            size="small"
                            fullWidth
                            {...register("shelf_to", {
                                required: "Введите конечное место хранения",
                            })}
                        />
                        <TextField
                            type="number"
                            label="Количество уровней"
                            size="small"
                            fullWidth
                            {...register("levels", {
                                required: "Введите количество уровней",
                            })}
                        />
                        <Box>
                            <Button variant="contained" type="submit">
                                Добавить
                            </Button>
                        </Box>
                    </Stack>
                </Paper>
                <Paper sx={{ p: 2, width: "100%" }}>
                    <TableContainer sx={{ mt: 2 }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Стелаж
                                    </StyledTableCell>

                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Начальное МХ
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Конечное МХ
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Количество уровней
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Всего МХ
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                {users.map((user: User) => {
                                    return (
                                        <StyledTableRow key={user.id}>
                                            <StyledTableCell
                                                align="center"
                                                component="th"
                                                scope="row"
                                            >
                                                {`${user.lastname} ${user.name}`}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {user.rule.title}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleString("ru-RU", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                })}
                                            </StyledTableCell>
                                            <StyledTableCell align="center"></StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody> */}
                        </Table>
                    </TableContainer>
                </Paper>
            </Stack>
        </Box>
    );
};
