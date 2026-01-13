import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f3ff',
      light: '#33f6ff',
      dark: '#00aab5',
    },
    secondary: {
      main: '#ff0055',
      light: '#ff3377',
      dark: '#b2003b',
    },
    background: {
      default: '#0a0a0a',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Orbitron", monospace',
    h1: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 700,
      letterSpacing: '2px',
    },
    h2: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
      letterSpacing: '1px',
    },
    h3: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '1px',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"JetBrains Mono", monospace',
    },
    body2: {
      fontFamily: '"JetBrains Mono", monospace',
    },
    button: {
      fontFamily: '"Orbitron", sans-serif',
      fontWeight: 500,
      letterSpacing: '1px',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        },
        contained: {
          boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
          '&:hover': {
            boxShadow: '0 0 30px rgba(0, 243, 255, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backdropFilter: 'blur(10px)',
          border: '1px solid',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(0, 243, 255, 0.2)',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 243, 255, 0.4)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00f3ff',
            boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
          },
        },
        input: {
          fontFamily: '"JetBrains Mono", monospace',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: '"JetBrains Mono", monospace',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#00f3ff',
        },
        track: {
          border: 'none',
          background: 'linear-gradient(90deg, #00f3ff, #0066ff)',
        },
        rail: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        thumb: {
          background: '#fff',
          border: '2px solid #00f3ff',
          boxShadow: '0 0 10px #00f3ff',
          '&:hover': {
            boxShadow: '0 0 20px #00f3ff',
          },
        },
        mark: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
        },
        markLabel: {
          fontFamily: '"JetBrains Mono", monospace',
          color: 'rgba(255, 255, 255, 0.6)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-switchBase.Mui-checked': {
            color: '#00ff9d',
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#00ff9d',
          },
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);