// pages/_app.tsx
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
