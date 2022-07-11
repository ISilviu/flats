import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getFlats, getFlatsCount } from "~/models/flat.server";
import { round } from "lodash";
import React from "react";
import { extractSearchParam, parseIntWithDefault } from "~/src/utilities";
import FlatsGrid from "~/src/components/FlatsGrid";

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

    const pagesCount = React.useMemo(
        () => round(flatsCount / pageSize),
        [flatsCount, pageSize]
    );

    return (
        <FlatsGrid
            flats={flats}
            pageNumber={pageNumber}
            pagesCount={pagesCount}
        />
    );
}