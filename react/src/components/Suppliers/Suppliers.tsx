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
import { useEffect, useState } from "react";
import { axiosClient } from "../../axiosClient";
import { Link } from "react-router-dom";

interface ISupplier {
    id: number;
    code: string;
    name: string;
    created_at: Date;
}

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

export const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);
    useEffect(() => {
        try {
            axiosClient.get("/suppliers").then((response) => {
                setSuppliers(response.data.data);
            });
        } catch (err) {}
    }, []);
    return (
        <Paper sx={{ p: 4 }}>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Поставщики
                </Typography>
                <Button
                    to="/suppliers/new"
                    component={Link}
                    variant="contained"
                    size="small"
                >
                    Добавить поставщика
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
                                Код поставщика
                            </StyledTableCell>

                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Наименование
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
