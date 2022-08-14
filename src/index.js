import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { QueryClient, QueryClientProvider } from 'react-query';

export const queryClient = new QueryClient()


ReactDOM.render(
  <SnackbarProvider anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }} maxSnack={3}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </QueryClientProvider>
  </SnackbarProvider >
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
