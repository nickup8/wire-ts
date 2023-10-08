import { useState, useEffect, ChangeEvent } from "react";
import {
    Paper,
    Typography,
    Box,
    Button,
    TextField,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    styled,
    tableCellClasses,
    Checkbox,
} from "@mui/material";
import { IInvoice, IInvoiceProps } from "../typesAndInterfaces";
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

const label = { inputProps: { "aria-label": "" } };

export const Invoice = ({ file, invoices }: IInvoiceProps) => {
    return (
        <Paper sx={{ p: 4 }}>
            <Box sx={{ mb: 2 }}>
                <Typography variant="h4" fontWeight="bold">
                    Накладная № {invoices.number} от {invoices?.date}
                </Typography>
                <Typography variant="h6">
                    Поставщик: {invoices.supplier.name}
                </Typography>
            </Box>
            <Typography variant="h4" fontWeight="bold">
                Материалы
            </Typography>

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
                                HU
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
                                Количество
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {file.map((wire, index) => {
                            return (
                                <StyledTableRow key={wire.hu + index}>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {wire.material}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {wire.hu}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {wire.description}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {wire.qnt}
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" sx={{ mt: 2 }}>
                Сохранить
            </Button>
        </Paper>
    );
};
