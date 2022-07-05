import PropTypes from 'prop-types';
import { Button, Card, CardMedia, Stack, Typography, useTheme } from "@mui/material";

type FlatCardProps = {
    title: string;
    imageUrl: string;
};

export default function FlatCard({ title, imageUrl }: FlatCardProps) {
    const theme = useTheme();
    return (
        <Card
            sx={{
                width: '100%',
                display: 'flex',
                borderRadius: theme.shape.borderRadius,
            }}
            raised={true}
        >
            <CardMedia
                component="img"
                image={imageUrl}
                alt="flat image"
                sx={{
                    borderRadius: theme.shape.borderRadius,
                    width: theme.spacing(27),
                    height: theme.spacing(25),
                }}
            />
            <Stack
                alignItems="center"
                width="100%"
                justifyContent="center"
            >
                <Typography paragraph>
                    {title}
                </Typography>
                <Button variant="outlined">
                    <Typography p={0.2}>
                        Rent me
                    </Typography>
                </Button>
            </Stack>
        </Card>
    );
}

FlatCard.propTypes = {
    title: PropTypes.string,
    imageUrl: PropTypes.string,
};