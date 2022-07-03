import { Box, Chip, Stack, Typography } from "@mui/material";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getFlats } from "~/models/flat.server";

type LoaderData = {
    flats: Awaited<ReturnType<typeof getFlats>>;
};

export const loader = async () => {
    return json<LoaderData>({
        flats: await getFlats(),
    });
};

export default function Flats() {
    const { flats } = useLoaderData() as LoaderData;

    return (
        <Stack>
            {flats.map(flat => (
                <React.Fragment key={flat.id}>
                    <Typography variant="h4">{flat.title}</Typography>
                    <Box borderRadius={1} bgcolor="primary">
                        <img src={flat.image_url} alt={flat.title} />
                    </Box>
                </React.Fragment>
            ))}
        </Stack>
    );
}