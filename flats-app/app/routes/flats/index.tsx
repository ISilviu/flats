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
        <div>
            {flats.map(flat => (
                <React.Fragment key={flat.id}>
                    <h1>{flat.title}</h1>
                    <img src={flat.image_url} alt={flat.title} />
                </React.Fragment>
            ))}
        </div>
    );
}