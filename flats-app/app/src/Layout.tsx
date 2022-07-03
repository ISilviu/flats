import { Box, AppBar, Toolbar, SvgIcon, Typography } from '@mui/material';
import * as React from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppBar position="absolute">
        <Toolbar disableGutters>
          <SvgIcon
            component={ApartmentIcon}
            fontSize="large"
            sx={{ ml: 2 }}
          />
          <Typography pl={2}>Flats App</Typography>
        </Toolbar>
      </AppBar>
      <Box>
        {children}
      </Box>
    </>
  );
}