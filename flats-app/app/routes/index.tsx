import { Grid, Stack, Typography } from "@mui/material";
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
    <Stack spacing={1}>
      <Typography variant="h1">Flats - best flats in town</Typography>
      <Grid container rowGap={3} columnGap={1.5} display="flex" justifyContent="center">
        {flats.map(flat => (
          <Grid item xs={12} md={6} lg={3} key={flat.id} display="flex" justifyContent="center">
            <FlatCard
              title={flat.title}
              imageUrl={flat.image_url}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}