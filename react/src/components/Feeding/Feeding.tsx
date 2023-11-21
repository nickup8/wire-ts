import { useEffect, useState } from "react";
import {
    Paper,
    Box,
    Typography,
    Divider,
    styled,
    TableContainer,
    TableCell,
    tableCellClasses,
    TableRow,
    Table,
    TableHead,
    TableBody,
} from "@mui/material";
import { axiosClient } from "../../axiosClient";
import { Preloader } from "../Preloader/Preloader";
import { Wire } from "../typesAndInterfaces";

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

export const Feeding = () => {
    const [wiresFedding, setWiresFeeding] = useState<Wire[] | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/wires_feeding").then(async (response) => {
            try {
                setWiresFeeding(response.data.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        });
    }, []);

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <Paper sx={{ p: 4 }}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold">
                            Сток на фидинге
                        </Typography>
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
                                        Партия
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Количество
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Накладная
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Поставщик
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {wiresFedding?.map((wire: any) => {
                                    return (
                                        <StyledTableRow key={wire.wire.id}>
                                            <StyledTableCell
                                                align="center"
                                                component="th"
                                                scope="row"
                                            >
                                                {wire.wire.material}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.storage_bin.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.wire.hu}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.wire.description}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.wire.batch}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.wire.qnt}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.wire.invoice.number}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.wire.supplier.name}
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            )}
        </>
    );
};
