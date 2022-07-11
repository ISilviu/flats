import { Grid, Pagination, Stack } from "@mui/material";
import { useSearchParams } from "@remix-run/react";
import FlatCard from "./FlatCard";

type FlatsGridProps = {
    flats: Array<{ id: number, title: string, image_url: string }>;
    pagesCount: number; 
    pageNumber: number;
};

export default function FlatsGrid({ flats, pagesCount, pageNumber }: FlatsGridProps) {
    const [, setSearchParams] = useSearchParams();
    return (
        <Stack
            spacing={2}
            pt={10}
            maxHeight="100vh"
            alignItems="center"
        >
            <Grid
                container
                rowGap={3}
                columnGap={1.5}
                display="flex"
                justifyContent="center"
                overflow="auto"
            >
                {flats.map(flat => (
                    <Grid item xs={12} md={6} lg={3} key={flat.id} display="flex" justifyContent="center">
                        <FlatCard
                            title={flat.title}
                            imageUrl={flat.image_url}
                        />
                    </Grid>
                ))}
            </Grid>
            <Pagination
                count={pagesCount}
                sx={{ py: 1 }}
                page={pageNumber}
                color="primary"
                onChange={(e, pageNumber) => setSearchParams({
                    page: `${pageNumber}`,
                })}
            />
        </Stack>
    );
}