import { Link } from "@mui/material";
import { Link as RemixLink } from "@remix-run/react";

type AppLinkProps = {
    to: string;
    children: JSX.Element;
};

export default function AppLink({ to, children }: AppLinkProps) {
    return (
        <Link
            component={RemixLink}
            to={to}
            color="inherit"
            underline="none"
        >
            {children}
        </Link>
    );
}