import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0088d6',
      dark: '#006bb0',
      light: '#33a0de',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2952d0',
    },
    text: {
      primary: '#1c2833',
      secondary: '#6c7a89',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 800,
      color: '#154ca0',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;

