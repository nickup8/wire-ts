import {
    Paper,
    Button,
    Box,
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
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosClient } from "../../axiosClient";
import { User } from "../../context/AutContext";

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

export const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        try {
            axiosClient("/users").then((data) => {
                setUsers(data.data.data);
            });
        } catch (error) {}
    }, []);

    console.log(users);
    return (
        <Paper sx={{ p: 4 }}>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Пользователи
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    component={Link}
                    to="/users/new"
                >
                    Добавить пользователя
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
                                Фамилия
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Имя
                            </StyledTableCell>
                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Роль
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
                        {users.map((user: User) => {
                            return (
                                <StyledTableRow key={user.id}>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {user.lastname}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {user.name}
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
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
