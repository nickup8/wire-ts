import { useEffect, useState } from "react";
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
    Alert,
} from "@mui/material";

import { axiosClient } from "../../axiosClient";
import { useMachine } from "../../context/MachineContext";
import { IMachine } from "../typesAndInterfaces";
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
export const KomaxOperator = () => {
    const [machine, setMachine] = useState<IMachine | null>(null);
    const [loading, setLoading] = useState(false);
    const { machine_id, updateMachine } = useMachine();
    useEffect(() => {
        setLoading(true);
        axiosClient.get(`/machines/${machine_id}`).then((response) => {
            setMachine(response.data.data);
            setLoading(false);
        });
    }, []);
    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <Box>
                    <Stack spacing={2}>
                        <Typography variant="h4" fontWeight="bold">
                            {machine?.number} - {machine?.name}
                        </Typography>
                        <Box>
                            <Button
                                variant="text"
                                size="small"
                                onClick={updateMachine}
                            >
                                Изменить машину
                            </Button>
                        </Box>
                    </Stack>
                    <Stack spacing={3} direction="row" sx={{ mt: 4 }}>
                        <Box sx={{ width: "450px" }} textAlign="center">
                            <Paper sx={{ p: 4 }}>
                                <Stack spacing={2}>
                                    <Typography variant="h6">
                                        Заказать провод:
                                    </Typography>

                                    <TextField
                                        label="Введите номер материала"
                                        size="small"
                                        fullWidth
                                    />

                                    <Box>
                                        <Button variant="contained">
                                            Заказать
                                        </Button>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                            <Paper sx={{ p: 4 }}>
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
                                                    Ячейка
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="center"
                                                    sx={{
                                                        fontSize: "18px",
                                                    }}
                                                >
                                                    Действие
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        {/* <TableBody>
                                                {wires.map((wire: Wire) => {
                                                    return (
                                                        <StyledTableRow
                                                            key={wire.id}
                                                        >
                                                            <StyledTableCell
                                                                align="center"
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                {wire.material}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    wire.description
                                                                }
                                                            </StyledTableCell>

                                                            <StyledTableCell align="center">
                                                                {wire.hu}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    );
                                                })}
                                            </TableBody> */}
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </Box>
                    </Stack>
                </Box>
            )}
        </>
    );
};
