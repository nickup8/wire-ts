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
import { Link } from "react-router-dom";

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
                            <StyledTableCell align="center">
                                Имя
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Роль
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Дата создания
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Действия
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                Сироткин Николай
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Logistik
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {new Date().getFullYear()}
                            </StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                Сироткин Николай
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Logistik
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {new Date().getFullYear()}
                            </StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                Сироткин Николай
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Logistik
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {new Date().getFullYear()}
                            </StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                Сироткин Николай
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Logistik
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {new Date().getFullYear()}
                            </StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                            >
                                Сироткин Николай
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Logistik
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                {new Date().getFullYear()}
                            </StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};
