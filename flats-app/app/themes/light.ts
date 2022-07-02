import { createTheme } from '@mui/material';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    drawerWidth: number,
  }
}

const lightTheme = createTheme({
  shape: { borderRadius: 10 },
  mixins: {
    drawerWidth: 220,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Helvetica',
      'Arial',
    ].join(','),
    fontWeightMedium: 600,
    fontWeightBold: 900,
  }
});

export default lightTheme;
