import { useState, useEffect } from "react";
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
import { IStorageBinFedding } from "../typesAndInterfaces";
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
export const StorageBinFeeding = () => {
    const form = useForm();
    const { register, getValues, handleSubmit, resetField } = form;
    const [storageList, setStorageList] = useState<IStorageBinFedding[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/storage_bin_feeding_list").then((response) => {
            setStorageList(response.data.data);
            setLoading(false);
        });
    }, []);

    const onSubmit = async () => {
        setLoading(true);
        let count = 0;
        try {
            const res = await axiosClient.post("/storage_bin_feeding", {
                rack: getValues("rack"),
                shelf_from: getValues("shelf_from"),
                shelf_to: getValues("shelf_to"),
                level_from: getValues("level_from"),
                level_to: getValues("level_to"),
            });
            if (res.status === 200) {
                count = res.data;
                const response = await axiosClient.post(
                    "/storage_bin_feeding_list",
                    {
                        rack: getValues("rack"),
                        shelf_from: getValues("shelf_from"),
                        shelf_to: getValues("shelf_to"),
                        level_from: getValues("level_from"),
                        level_to: getValues("level_to"),
                        count_shelfs: count,
                    }
                );
                if (response.status === 201) {
                    setStorageList([...storageList, response.data]);
                    setLoading(false);
                    resetField("rack");
                    resetField("shelf_from");
                    resetField("shelf_to");
                    resetField("level_from");
                    resetField("level_to");
                }
            }
        } catch (error) {}
    };
    return (
        <>
            {!loading ? (
                <Box>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                        Места хранения на фидинге
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
                                        label="Rack"
                                        size="small"
                                        fullWidth
                                        {...register("rack", {
                                            required: true,
                                        })}
                                    />
                                    <TextField
                                        type="text"
                                        label="Начальное МХ"
                                        size="small"
                                        fullWidth
                                        {...register("shelf_from", {
                                            required: true,
                                        })}
                                    />
                                    <TextField
                                        type="text"
                                        label="Конечное МХ"
                                        size="small"
                                        fullWidth
                                        {...register("shelf_to", {
                                            required: true,
                                        })}
                                    />
                                    <TextField
                                        type="text"
                                        label="Начальный уровень"
                                        size="small"
                                        fullWidth
                                        {...register("level_from", {
                                            required: true,
                                        })}
                                    />
                                    <TextField
                                        type="text"
                                        label="Конечный уровень"
                                        size="small"
                                        fullWidth
                                        {...register("level_to", {
                                            required: true,
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
                            {storageList.length ? (
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
                                                    Начальный уровень
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    align="center"
                                                    sx={{ fontSize: "18px" }}
                                                >
                                                    Конечный уровень
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
                                            {storageList.map(
                                                (
                                                    storage: IStorageBinFedding
                                                ) => {
                                                    return (
                                                        <StyledTableRow
                                                            key={storage.id}
                                                        >
                                                            <StyledTableCell
                                                                align="center"
                                                                component="th"
                                                                scope="row"
                                                            >
                                                                {storage.rack}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    storage.shelf_from
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    storage.shelf_to
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    storage.level_from
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    storage.level_to
                                                                }
                                                            </StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                {
                                                                    storage.count_shelfs
                                                                }
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    );
                                                }
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <h1>Нет мест хранения</h1>
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
