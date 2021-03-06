import * as React from 'react';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from '@remix-run/react';
import { withEmotionCache } from '@emotion/react';
import { Box, Stack, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material';
import theme from './src/theme';
import ClientStyleContext from './src/ClientStyleContext';
import Layout from './src/Layout';

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(({ children, title }: DocumentProps, emotionCache) => {
  const clientStyleData = React.useContext(ClientStyleContext);

  // Only executed on client
  useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line no-underscore-dangle
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en" style={{ width: '100%', height: '100%' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500&family=Inter:wght@200;300;400;500&display=swap" rel="stylesheet" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
        <meta name="emotion-insertion-point" content="emotion-insertion-point" />
      </head>
      <body style={{ width: '100%', height: '100%' }}>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
});

// https://remix.run/api/conventions#default-export
// https://remix.run/api/conventions#route-filenames
export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Error!">
      <Layout>
        <Box pt={10}>
          <h1>There was an error</h1>
          {process.env.NODE_ENV === 'development' ? (
            <p>{error.message}</p>
          ) : null}
        </Box>
      </Layout>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  const caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = <p>Oops! Looks like you tried to visit a page that you do not have access to.</p>;
      break;
    case 404:
      message = <p>Oops! Looks like you tried to visit a page that does not exist.</p>;
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <Box pt={10} display="flex" justifyContent="center" alignItems="center">
          <Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <h1>{caught.status}</h1>
              <h2>{caught.statusText}</h2>
            </Stack>
            {message}
          </Stack>
        </Box>
      </Layout>
    </Document>
  );
}
