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

export const Invoice = ({ file, invoices }: IInvoiceProps) => {
    const [wires, setWires] = useState([]);
    const [fileExcel, setFileExcel] = useState(null);
    console.log(file);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFileExcel(event.target.files[0]);
        }
    };

    const onSubmit = async () => {
        if (!fileExcel) {
            return;
        }

        try {
            const resp = await axiosClient.post("/import", {
                invoice: fileExcel,
            });
            if (resp.status === 200) {
                setWires(resp.data.wires);
            }
        } catch (error) {}
    };
    // console.log(invoice[0].name);

    // useEffect(() => {
    //     try {
    //         axiosClient
    //             .post(
    //                 "/import",
    //                 {
    //                     invoice: file,
    //                 }
    //                 // {
    //                 //     headers: {
    //                 //         "Content-Type": file?.type,
    //                 //         "Content-Length": `${file?.size}`,
    //                 //     },
    //                 // }
    //             )
    //             .then((resp) => {
    //                 setWires(resp.data.wires);
    //                 console.log(wires);
    //             });
    //     } catch (error) {}
    // });

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
            <TextField
                fullWidth
                type="file"
                size="small"
                onChange={handleFileChange}
            />
            <Button onClick={onSubmit}>Dowload</Button>
            {/* <TableContainer sx={{ mt: 2 }}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell
                                align="center"
                                sx={{ fontSize: "18px" }}
                            >
                                Фамилия Имя
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
                        {wires.map((wire) => {
                            return (
                                <StyledTableRow key={wire.id}>
                                    <StyledTableCell
                                        align="center"
                                        component="th"
                                        scope="row"
                                    >
                                        {`${wire.lastname} ${wire.name}`}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        {wire.rule.title}
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
                                    <StyledTableCell align="center"></StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer> */}
        </Paper>
    );
};
