import React from 'react';
import ReactDOM from 'react-dom/client';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {ThemeProvider, createGlobalStyle} from 'styled-components';
import App from './App';
import {theme} from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 13px;
    font-family: ${props => props.theme.font.fontFamily};

    @media screen and (min-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 16px;
    }
  }

  body {
    margin: 0;
    padding: 1rem;
  }
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
