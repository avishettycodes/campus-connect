import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2E7D32', // Forest green
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    secondary: {
      main: '#8D6E63', // Tan
      light: '#A1887F',
      dark: '#5F4339',
    },
    background: {
      default: '#f9f8e8', // Pale yellow background
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Quicksand", "Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Fredoka One", "Quicksand", sans-serif',
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: '#2E7D32',
    },
    h2: {
      fontFamily: '"Fredoka One", "Quicksand", sans-serif',
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.25px',
    },
    h3: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '2rem',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    body1: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1.1rem',
      lineHeight: 1.6,
      fontWeight: 500,
    },
    body2: {
      fontFamily: '"Quicksand", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.5,
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Quicksand", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2E7D32',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '12px 24px',
          fontSize: '1.1rem',
          fontWeight: 600,
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease-in-out',
          },
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
            transition: 'all 0.3s ease-in-out',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 500,
          },
          '& .MuiInputLabel-root': {
            fontFamily: '"Quicksand", sans-serif',
            fontWeight: 600,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontFamily: '"Quicksand", sans-serif',
          fontWeight: 600,
          fontSize: '0.9rem',
        },
      },
    },
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme; 