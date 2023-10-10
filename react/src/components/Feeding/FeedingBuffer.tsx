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

export const FeedingBuffer = () => {
    const [wiresAcceptance, setWiresAcceptance] = useState<Wire[] | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/feedin_buffer").then(async (response) => {
            try {
                setWiresAcceptance(response.data.data);
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
                            Зона приемки Фидинг
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
                                    <StyledTableCell
                                        align="center"
                                        sx={{ fontSize: "18px" }}
                                    >
                                        Дата добавления
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {wiresAcceptance?.map((wire: Wire) => {
                                    return (
                                        <StyledTableRow key={wire.id}>
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
                                                {wire.batch}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.qnt}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.invoice.number}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {wire.supplier.name}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                {new Date(
                                                    wire.created_at
                                                ).toLocaleString("ru-RU", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                })}
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
