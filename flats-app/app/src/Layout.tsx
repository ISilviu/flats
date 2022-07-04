import { Box, AppBar, Toolbar, SvgIcon, Typography, Link } from '@mui/material';
import * as React from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AppLink from './components/AppLink';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar
        position="absolute"
        color="transparent"
        elevation={0}
      >
        <Toolbar disableGutters>
          <SvgIcon
            component={ApartmentIcon}
            fontSize="large"
            sx={{ ml: 2 }}
          />
          <AppLink to="/">
            <Typography pl={2}>Flatr</Typography>
          </AppLink>
        </Toolbar>
      </AppBar>
      <Box height="100vh">
        {children}
      </Box>
    </>
  );
}