import { Button, Card, Stack, Typography } from "@mui/material";
import { json } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getFlatsCount } from "~/models/flat.server";
import AppLink from "~/src/components/AppLink";

type InfoCardData = {
  title: string;
}

type LoaderData = {
  flatsCount: Awaited<ReturnType<typeof getFlatsCount>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    flatsCount: await getFlatsCount(),
  });
};

function InfoCard({ title }: InfoCardData) {
  return (
    <Card
      raised
      sx={{
        p: 1.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
      }}
    >
      <Typography color="CaptionText">{title}</Typography>
    </Card>
  );
}

export default function Flats() {
  const { flatsCount } = useLoaderData() as LoaderData;

  return (
    <Stack
      height="100%"
      width="100%"
      justifyContent="center"
      alignItems="center"
      spacing={3.5}
    >
      <Stack alignItems="flex-start" spacing={2.5}>
        <Typography margin={0} variant="h1" fontWeight={500}>Flat rental, but better</Typography>
        <Typography margin={0} variant="h5">Rent your next dream flat now</Typography>
      </Stack>
      <AppLink to="/flats">
        <Button variant="contained">
          <Typography p={1.1}>
            See available flats
          </Typography>
        </Button>
      </AppLink>
      <Stack direction="row" spacing={3.5} pt={4}>
        <InfoCard title="In the Czech Republic" />
        <InfoCard title={`${flatsCount} flats available`} />
      </Stack>
    </Stack>
  )
}