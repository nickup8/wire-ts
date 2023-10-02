import {
    Paper,
    Box,
    Typography,
    Divider,
    Button,
    styled,
    TableContainer,
    TableCell,
    tableCellClasses,
    TableRow,
    Table,
    TableHead,
    TableBody,
} from "@mui/material";

import { useEffect, useState } from "react";
import { axiosClient } from "../../axiosClient";
import { Link } from "react-router-dom";
import { IInvoice } from "../typesAndInterfaces";

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

export const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        try {
            axiosClient.get("/invoices").then((response) => {
                setInvoices(response.data.data);
            });
        } catch (err) {}
    }, []);
    return (
        <Paper sx={{ p: 4 }}>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Накладные
                </Typography>
                <Button
                    to="/invoices/new"
                    component={Link}
                    variant="contained"
                    size="small"
                >
                    Загрузить накладную
                </Button>
            </Box>
            <Divider />
            <TableContainer sx={{ mt: 2 }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Номер накладной
                            </StyledTableCell>

                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Дата накладной
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Код поставщика
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Наименование поставщика
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Загрузил
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Дата загрузки
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
                        {invoices.map((invoice: IInvoice) => {
                            return (
                                <StyledTableRow key={invoice.id}>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {invoice.number}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {new Date(invoice.date).toLocaleString(
                                            "ru-RU",
                                            {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            }
                                        )}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {invoice.supplier.code}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {invoice.supplier.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {invoice.user.lastname +
                                            " " +
                                            invoice.user.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {new Date(
                                            invoice.created_at
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
