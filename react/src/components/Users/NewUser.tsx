import { useEffect, useState } from "react";
import {
    Paper,
    Box,
    TextField,
    Typography,
    Divider,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Stack,
    IconButton,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
    Alert,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { axiosClient } from "../../axiosClient";
import { useNavigate } from "react-router-dom";

interface IRule {
    id: number;
    title: string;
}

export const NewUser = () => {
    const [rule, setRule] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);
    const [errorsBacked, setErrorsBackend] = useState([]);
    const [rules, setRules] = useState([]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickConfirmShowPassword = () =>
        setConfirmShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const handleMouseDownConfirmPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const form = useForm();

    const { register, handleSubmit, getValues, control, formState } = form;

    const { errors } = formState;

    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get("/rules").then((data) => {
            setRules(data.data.data);
        });
    }, []);

    const onSubmit = async () => {
        try {
            const resp = await axiosClient.post("/register", {
                name: getValues("name"),
                lastname: getValues("lastname"),
                login: getValues("login"),
                password: getValues("password"),
                password_confirmation: getValues("password_confirmation"),
                rule_id: getValues("rule_id"),
            });
            if (resp.status === 200) {
                navigate("/users");
            }
        } catch (error: any) {
            if (error.status === 401) {
                setErrorsBackend(error.response.data.message);
            } else if (error.response.status === 422) {
                setErrorsBackend(error.response.data.message);
            }
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        setRule(event.target.value as string);
    };
    return (
        <Paper sx={{ p: 4 }}>
            <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
                <Typography variant="h4" fontWeight="bold">
                    Добавить нового пользователя
                </Typography>
            </Box>
            <Divider />
            <Box
                component="form"
                noValidate
                sx={{ mt: 3 }}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Логин"
                        error={!!errors.login}
                        size="small"
                        fullWidth
                        {...register("login", {
                            required: "Введите логин",
                        })}
                        helperText={errors.login ? errors.login.message : ""}
                    />
                    <TextField
                        label="Имя"
                        size="small"
                        error={!!errors.name}
                        fullWidth
                        {...register("name", {
                            required: "Введите имя",
                        })}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Фамилия"
                        size="small"
                        error={!!errors.name}
                        fullWidth
                        {...register("lastname", {
                            required: "Введите имя",
                        })}
                        helperText={errors.name?.message}
                    />
                    <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.password}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Пароль
                        </InputLabel>
                        <OutlinedInput
                            {...register("password", {
                                required: "Введите пароль",
                                min: 8,
                            })}
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText>
                            {errors.password?.message}
                        </FormHelperText>
                    </FormControl>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        size="small"
                        error={!!errors.password_confirmation}
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Повторите пароль
                        </InputLabel>
                        <OutlinedInput
                            {...register("password_confirmation", {
                                required: "Повторите пароль",
                                min: 8,
                            })}
                            type={confirmShowPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickConfirmShowPassword}
                                        onMouseDown={
                                            handleMouseDownConfirmPassword
                                        }
                                        edge="end"
                                    >
                                        {confirmShowPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Повторите пароль"
                        />
                        <FormHelperText>
                            {errors.password_confirmation?.message}
                        </FormHelperText>
                    </FormControl>

                    <Controller
                        render={({ field }) => (
                            <FormControl
                                fullWidth
                                size="small"
                                error={!!errors.rule_id}
                            >
                                <InputLabel>Роль</InputLabel>
                                <Select
                                    {...field}
                                    label="Роль"
                                    {...register("rule_id", {
                                        required: "Выберите роль",
                                    })}
                                    onChange={handleChange}
                                    value={rule}
                                >
                                    {rules.map((rule: IRule) => {
                                        return (
                                            <MenuItem
                                                key={rule.id}
                                                value={rule.id}
                                            >
                                                {rule.title}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>
                                    {errors.rule_id?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                        name="Select"
                        control={control}
                    />
                </Stack>

                <Button type="submit" variant="contained" sx={{ my: 2 }}>
                    Добавить
                </Button>
                {errorsBacked.length > 0 && (
                    <Alert severity="error" sx={{ width: "100%" }}>
                        {errorsBacked}
                    </Alert>
                )}
            </Box>
        </Paper>
    );
};
