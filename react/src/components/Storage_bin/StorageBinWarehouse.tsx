import React from "react";

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
                    <Stack spacing={1} component="form">
                        <TextField
                            type="text"
                            label="Номер стелажа"
                            size="small"
                            fullWidth
                        />
                        <TextField
                            type="text"
                            label="Начальное МХ"
                            size="small"
                            fullWidth
                        />
                        <TextField
                            type="text"
                            label="Конечное МХ"
                            size="small"
                            fullWidth
                        />
                        <TextField
                            type="text"
                            label="Количество уровней"
                            size="small"
                            fullWidth
                        />
                        <Box>
                            <Button variant="contained">Добавить</Button>
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
