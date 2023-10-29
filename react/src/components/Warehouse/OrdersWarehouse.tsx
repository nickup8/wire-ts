import {
    Paper,
    Box,
    Typography,
    Divider,
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
} from "@mui/material";
import { useState } from "react";
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

export const OrdersWarehouse = () => {
    const [loading, setLoading] = useState(false);
    return (
        <>
            {!loading ? (
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                        Заказы с фидинга
                    </Typography>
                    <Divider />
                    <TableContainer sx={{ mt: 2 }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Материал
                                    </StyledTableCell>

                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Место хранения
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Описание
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        HU
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Действия
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                {suppliers.map((supplier: ISupplier) => {
                                    return (
                                        <StyledTableRow key={supplier.id}>
                                            <StyledTableCell
                                                align="center"
                                                component="th"
                                                scope="row"
                                            >
                                                {supplier.code}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {supplier.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {new Date(
                                                    supplier.created_at
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
            ) : (
                <Preloader />
            )}
        </>
    );
};
