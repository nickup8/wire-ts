import { useEffect, useState } from "react";

import {
    Box,
    Stack,
    Paper,
    Button,
    Typography,
    TableContainer,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    styled,
    tableCellClasses,
    TextField,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { axiosClient } from "../../axiosClient";
import { IStorageBin } from "../typesAndInterfaces";
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));
export const StorageBinWarehouse = () => {
    // const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<IStorageBin[]>([]);

    const form = useForm();

    const { register, handleSubmit, getValues, setValue } = form;
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/storage_bin_list").then((response) => {
            setList(response.data.data);
            setLoading(false);
        });
    }, []);
    const onSubmit = async () => {
        setLoading(true);
        let count = 0;
        try {
            const resp = await axiosClient.post("/storage_bin", {
                shelf: getValues("shelf"),
                shelf_from: getValues("shelf_from"),
                shelf_to: getValues("shelf_to"),
                levels: getValues("levels"),
            });
            if (resp.status === 200) {
                count = resp.data;
                const response = await axiosClient.post("storage_bin_list", {
                    shelf: getValues("shelf"),
                    shelf_from: getValues("shelf_from"),
                    shelf_to: getValues("shelf_to"),
                    levels: getValues("levels"),
                    count_shelfs: count * 6,
                });
                if (response.status === 201) {
                    let result = response.data;
                    setList([...list, result]);
                    setValue("shelf", "");
                    setValue("shelf_from", "");
                    setValue("shelf_to", "");
                    setValue("levels", "");
                    setLoading(false);
                }
            }
        } catch (error: any) {}
    };

    return (
        <>
            {!loading ? (
                <Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                        Места хранения на складе
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Box sx={{ width: "420px" }}>
                            <Paper sx={{ p: 2, textAlign: "center" }}>
                                <Typography
                                    variant="h6"
                                    sx={{ mb: 2 }}
                                    fontWeight="bold"
                                >
                                    Добавить МХ
                                </Typography>
                                <Stack
                                    spacing={1}
                                    component="form"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <TextField
                                        type="text"
                                        label="Номер стелажа"
                                        size="small"
                                        fullWidth
                                        {...register("shelf", {
                                            required: "Введите номер стелажа",
                                        })}
                                    />
                                    <TextField
                                        type="number"
                                        label="Начальное МХ"
                                        size="small"
                                        fullWidth
                                        {...register("shelf_from", {
                                            required:
                                                "Введите начальное место хранения",
                                        })}
                                    />
                                    <TextField
                                        type="number"
                                        label="Конечное МХ"
                                        size="small"
                                        fullWidth
                                        {...register("shelf_to", {
                                            required:
                                                "Введите конечное место хранения",
                                        })}
                                    />
                                    <TextField
                                        type="number"
                                        label="Количество уровней"
                                        size="small"
                                        fullWidth
                                        {...register("levels", {
                                            required:
                                                "Введите количество уровней",
                                        })}
                                    />
                                    <Box>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                        >
                                            Добавить
                                        </Button>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Box>
                        <Paper sx={{ p: 2, width: "100%" }}>
                            {list.length ? (
                                <TableContainer sx={{ mt: 2 }}>
                                    <Table aria-label="customized table">
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell
                                                    align="center"
                                                    sx={{ fontSize: "18px" }}
                                                >
                                                    Стелаж
                                                </StyledTableCell>

                                                <StyledTableCell
                                                    align="center"
                                                    sx={{ fontSize: "18px" }}
                                                >
                                                    Начальное МХ
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="center"
                                                    sx={{ fontSize: "18px" }}
                                                >
                                                    Конечное МХ
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="center"
                                                    sx={{ fontSize: "18px" }}
                                                >
                                                    Количество уровней
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="center"
                                                    sx={{ fontSize: "18px" }}
                                                >
                                                    Всего МХ
                                                </StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {list.map((item) => {
                                                return (
                                                    <StyledTableRow
                                                        key={item.id}
                                                    >
                                                        <StyledTableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {item.shelf}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {item.shelf_from}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {item.shelf_to}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {item.levels}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="center">
                                                            {item.count_shelfs}
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <h1>Места хранения еще не созданы</h1>
                            )}
                        </Paper>
                    </Stack>
                </Box>
            ) : (
                <Preloader />
            )}
        </>
    );
};
