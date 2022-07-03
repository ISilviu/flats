import { Grid, Pagination, Stack, Typography } from "@mui/material";
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
    <Stack
      spacing={2}
      pt={10}
      maxHeight="100vh" alignItems="center"
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
        count={10}
        sx={{ py: 1 }}
        color="primary"
      />
    </Stack>
  );
}