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
    IconButton,
    Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IOrderFeeding } from "../typesAndInterfaces";
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

export const FeedingOrders = () => {
    const [orders, _setOrders] = useState<IOrderFeeding[] | null>(null);

    const setOrders = async () => {
        try {
            const resp = await axiosClient.get("/orders_feeding");
            if (resp.status === 200) {
                _setOrders(resp.data.data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        setOrders();
    }, []);

    return (
        <Paper sx={{ p: 4, width: "30%" }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                Заказанные провода
            </Typography>
            <Divider />
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
                                № комакса
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order: IOrderFeeding) => {
                            return (
                                <StyledTableRow key={order.id}>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {order.material}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {order.machine.number}
                                    </StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
