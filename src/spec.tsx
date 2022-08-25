import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {render, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ThemeProvider} from 'styled-components';
import App from './App';
// import App from './AppTwo';
import {theme} from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

describe('Grid', () => {
  function renderApp() {
    return render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  test('renders list of paginated items', async () => {
    const view = renderApp();
    const items = await view.findAllByTestId('grid-item');

    expect(items.length).toBe(8);
  });

  test('shows items on second page', async () => {
    const view = renderApp();
    const nextButton = view.getByRole('button', {name: 'Next page'});

    await userEvent.click(nextButton);

    const items = await view.findAllByTestId('grid-item');

    await waitFor(() => expect(items.length).toBe(4));
  });

  test('shows items based on search', async () => {
    const expectedTitle = 'Test title 11';
    const view = renderApp();
    const searchField = view.getByRole('search');

    await userEvent.type(searchField, expectedTitle);

    await waitFor(async () => {
      const items = await view.findAllByTestId('grid-item');
      expect(items.length).toBe(1);
      expect(view.getByText(expectedTitle)).toBeInTheDocument();
    });
  });
});
