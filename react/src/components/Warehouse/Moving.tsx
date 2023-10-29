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

export const Moving = () => {
    return (
        <>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                Перемещение по местам хранения - склад
            </Typography>
            <Stack spacing={4} direction="row">
                <Stack spacing={4}>
                    <Box sx={{ width: "350px" }} textAlign="center">
                        <Paper sx={{ p: 4 }}>
                            <Stack component="form" noValidate>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    Введите МХ
                                </Typography>
                                <TextField
                                    label="Место хранения"
                                    size="small"
                                />
                                <Box>
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        sx={{ mt: 2 }}
                                        justifyContent="center"
                                    >
                                        <Button variant="contained">
                                            Подтвердить
                                        </Button>
                                        <Button variant="outlined">
                                            Отмена
                                        </Button>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Paper>
                    </Box>
                    <Box sx={{ width: "350px" }} textAlign="center">
                        <Paper sx={{ p: 4 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Введите HU провода
                            </Typography>
                            <Stack spacing={2}>
                                <TextField label="HU провода" size="small" />
                                <TextField label="HU провода" size="small" />
                                <TextField label="HU провода" size="small" />
                                <TextField label="HU провода" size="small" />
                                <TextField label="HU провода" size="small" />
                                <TextField label="HU провода" size="small" />
                                <Box>
                                    <Button variant="contained">
                                        Переместить
                                    </Button>
                                </Box>
                            </Stack>
                        </Paper>
                    </Box>
                </Stack>
                <Paper sx={{ p: 4, width: "100%" }}>
                    <Typography variant="h6">Место хранения:</Typography>
                    <Typography variant="body1">
                        Количество проводов 0/6
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
                                        Описание
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        HU
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
            </Stack>
        </>
    );
};
