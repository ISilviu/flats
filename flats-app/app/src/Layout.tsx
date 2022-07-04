import { Box, AppBar, Toolbar, SvgIcon, Typography } from '@mui/material';
import * as React from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';

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
          <Typography pl={2}>Flatr</Typography>
        </Toolbar>
      </AppBar>
      <Box height="100vh">
        {children}
      </Box>
    </>
  );
}