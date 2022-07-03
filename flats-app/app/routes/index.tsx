import { Stack } from "@mui/material";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getFlats } from "~/models/flat.server";
import FlatCard from "~/src/components/FlatCard";

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
        <FlatCard
          key={flat.id}
          title={flat.title}
          imageUrl={flat.image_url}
        />
      ))}
    </Stack>
  );
}