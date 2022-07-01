import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";

type Flat = {
    title: string;
    imageUrl: string;
};

type LoaderData = {
    flats: Array<Flat>;
};

export const loader = async () => {
    return json<LoaderData>({
        flats: [
            {
                title: 'The best apartment in Prague',
                imageUrl: 'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg'
            },
            {
                title: 'Best flats in Plsen!',
                imageUrl: 'https://img.staticmb.com/mbcontent//images/uploads/2021/7/flat-vs-independent-house.jpg'
            }
        ]
    });
};

export default function Flats() {
    const { flats } = useLoaderData() as LoaderData;

    return (
        <div>
            {flats.map(flat => (
                <React.Fragment key={flat.title}>
                    <h1>{flat.title}</h1>
                    <img src={flat.imageUrl} alt={flat.title} />
                </React.Fragment>
            ))}
        </div>
    );
}