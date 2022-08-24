import * as React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export function TestWrapper({children}: React.PropsWithChildren<object>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });

  return <Querycl
}
