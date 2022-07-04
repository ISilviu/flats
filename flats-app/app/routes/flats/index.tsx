import { Grid, Pagination, Stack } from "@mui/material";
import FlatCard from "~/src/components/FlatCard";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getFlats, getFlatsCount } from "~/models/flat.server";
import { round } from "lodash";
import React from "react";

type LoaderData = {
    flats: Awaited<ReturnType<typeof getFlats>>;
    flatsCount: Awaited<ReturnType<typeof getFlatsCount>>;
};

const defaultPageSize = 50;

const extractSearchParam = (searchParams: URLSearchParams, key: string, defaultValue: string) => {
    let parameterValue = defaultValue;
    if (searchParams.has(key)) {
        parameterValue = searchParams.get(key) ?? defaultValue;
        if (parameterValue === '') {
            parameterValue = defaultValue;
        }
    }
    return parameterValue
};

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = parseInt(extractSearchParam(url.searchParams, 'page', '0'));
    const pageSize = parseInt(extractSearchParam(url.searchParams, 'pageSize', `${defaultPageSize}`));

    return json<LoaderData>({
        flats: await getFlats({
            pageNumber: pageNumber,
            pageSize: pageSize,
        }),
        flatsCount: await getFlatsCount(),
    });
};

export default function Flats() {
    const { flats, flatsCount } = useLoaderData() as LoaderData;

    const [params, setSearchParams] = useSearchParams();

    const pageNumber = parseInt(params.get('page') ?? '0') + 1;
    const pageSize = parseInt(params.get('pageSize') ?? `${defaultPageSize}`);

    const pagesCount = React.useMemo(() => round(flatsCount / pageSize), [flatsCount, pageSize]);

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
            />
        </Stack>
    );
}