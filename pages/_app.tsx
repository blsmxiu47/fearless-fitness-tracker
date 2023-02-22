import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ReactElement } from 'react';

interface Props {
  Component: React.ComponentType,
  pageProps: ReactElement
}

export default function App({ Component, pageProps }: Props) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}