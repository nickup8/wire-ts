import { Box, Typography, Stack } from "@mui/material";
import { axiosClient } from "../../axiosClient";
import { Preloader } from "../Preloader/Preloader";
import { FeedingOrders } from "./FeedingOrders";
import { FeedingMoving } from "./FeedingMoving";
import { FeedingEmpty } from "./FeedingEmpty";
import { FeedingSearch } from "./FeedingSearch";
export const FeedingOperator = () => {
    return (
        <>
            <Typography variant="h4" sx={{ mb: 4 }} fontWeight="bold">
                Зона фидинга
            </Typography>
            <Stack direction="row" spacing={3}>
                <FeedingOrders />

                <Stack spacing={3}>
                    <FeedingSearch />
                    <Stack direction="row" spacing={3}>
                        <FeedingMoving />
                        <FeedingEmpty />
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
};
