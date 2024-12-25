import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorMode = () => useContext(ColorModeContext);

const Theme: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                primary: {
                  main: '#00796b',
                },
                secondary: {
                  main: '#004d40',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
                text: {
                  primary: '#ffffff',
                  secondary: '#b0b0b0', 
                },
              }
            : {
                primary: {
                  main: '#49AB8C',
                },
                secondary: {
                  main: '#49AB8C',
                },
                background: {
                  default: '#FEF5EF',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#000000',
                  secondary: '#4d4d4d',
                },
              }),
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                textTransform: 'none',
                fontWeight: 'bold',
              },
              containedPrimary: {
                color: '#ffffff',
                ...(mode === 'dark'
                  ? {
                      backgroundColor: '#00796b',
                      '&:hover': { backgroundColor: '#004d40' },
                    }
                  : {
                      backgroundColor: '#49AB8C',
                      '&:hover': { backgroundColor: '#70C2A8' },
                    }),
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                ...(mode === 'dark'
                  ? { backgroundColor: '#1e1e1e' }
                  : { backgroundColor: '#ffffff', color: '#000000' }),
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Theme;
