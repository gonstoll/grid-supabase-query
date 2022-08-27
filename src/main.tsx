import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import Home from './components/Home';
// import Home from './components/ClientHome';
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
    font-family: ${props => props.theme.font.fontFamily};
  }

  body {
    margin: 0;
    padding: 1rem;
  }
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
