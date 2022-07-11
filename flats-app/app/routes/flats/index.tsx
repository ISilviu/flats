import { Grid, Pagination, Stack } from "@mui/material";
import FlatCard from "~/src/components/FlatCard";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getFlats, getFlatsCount } from "~/models/flat.server";
import { round } from "lodash";
import React from "react";
import { extractSearchParam, parseIntWithDefault } from "~/src/utilities";

type LoaderData = {
    flats: Awaited<ReturnType<typeof getFlats>>;
    flatsCount: Awaited<ReturnType<typeof getFlatsCount>>;
    pageNumber: number;
    pageSize: number;
};

const defaultPageSize = 50;

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = parseIntWithDefault(extractSearchParam(url.searchParams, 'page', '1'), 1);
    const pageSize = parseIntWithDefault(extractSearchParam(url.searchParams, 'pageSize', `${defaultPageSize}`), defaultPageSize);

    return json<LoaderData>({
        flats: await getFlats({
            pageNumber: pageNumber,
            pageSize: pageSize,
        }),
        flatsCount: await getFlatsCount(),
        pageNumber: pageNumber,
        pageSize: pageSize,
    });
};

export default function Flats() {
    const { flats, flatsCount, pageNumber, pageSize } = useLoaderData() as LoaderData;

    const [, setSearchParams] = useSearchParams();

    const pagesCount = React.useMemo(
        () => round(flatsCount / pageSize),
        [flatsCount, pageSize]
    );

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