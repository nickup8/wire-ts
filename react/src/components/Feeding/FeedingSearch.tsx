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
    IconButton,
    Divider,
} from "@mui/material";

export const FeedingSearch = () => {
    return (
        <Paper sx={{ p: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                Поиск
            </Typography>
            <Divider />
            <Stack spacing={1} sx={{ mt: 2 }}>
                <TextField label="Введите номер материала" size="small" />
                <Box>
                    <Button type="submit" variant="contained">
                        Искать
                    </Button>
                </Box>
            </Stack>
        </Paper>
    );
};
