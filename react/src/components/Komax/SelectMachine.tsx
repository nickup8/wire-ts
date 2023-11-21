import { useState, useEffect } from "react";
import { Box, Typography, Select, MenuItem, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { axiosClient } from "../../axiosClient";
import { IMachine } from "../typesAndInterfaces";

import { useMachine } from "../../context/MachineContext";

export const SelectMachine = () => {
    const [machinesList, setMachinesList] = useState<IMachine[] | null>(null);
    const { setMachine } = useMachine();

    useEffect(() => {
        axiosClient.get("/machines").then((response) => {
            setMachinesList(response.data.data);
        });
    }, []);

    const form = useForm({
        defaultValues: {
            Select: "",
        },
    });
    const { getValues, control } = form;

    const SelectMachine = () => {
        setMachine(getValues().Select);
    };
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
        >
            <Box sx={{ width: "400px" }} textAlign="center">
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
                    Выберите машину
                </Typography>
                <Controller
                    render={({ field }) => (
                        <Select {...field} fullWidth>
                            {machinesList?.map((machine) => {
                                return (
                                    <MenuItem
                                        value={machine.id}
                                        key={`${machine.id}_${machine.name}`}
                                    >
                                        {`${machine.number}-${machine.name}`}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    )}
                    name="Select"
                    control={control}
                />
                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={SelectMachine}
                >
                    Подтвердить
                </Button>
            </Box>
        </Box>
    );
};
