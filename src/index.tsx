import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './app/AppRouter';
import { store } from './app/redux/store';
import './index.css';

const queryClient = new QueryClient();

const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

export const persistOptions = {
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
      <Provider store={store}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={persistOptions}
        >
          <CookiesProvider>
            <AppRouter />
          </CookiesProvider>
        </PersistQueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
