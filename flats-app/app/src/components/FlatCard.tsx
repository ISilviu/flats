import PropTypes from 'prop-types';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";

type FlatCardProps = {
    title: string;
    imageUrl: string;
};

export default function FlatCard({ title, imageUrl }: FlatCardProps) {
    return (
        <Card sx={{ width: '100%' }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt="flat image"
                />
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography paragraph>
                        {title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

FlatCard.propTypes = {
    title: PropTypes.string,
    imageUrl: PropTypes.string,
};