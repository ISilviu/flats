import * as React from 'react';
import type { LinksFunction } from '@remix-run/node';
import {
  Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLocation,
} from '@remix-run/react';
import { Box } from '@mui/material';
import ThemeConfig from '~/themes';
/**
 * The `links` export is a function that returns an array of objects that map to
 * the attributes for an HTML `<link>` element. These will load `<link>` tags on
 * every route in the app, but individual routes can include their own links
 * that are automatically unloaded when a user navigates away from the route.
 *
 * https://remix.run/api/app#links
 */
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
];

type DocumentProps = { children: React.ReactNode; title?: string } & typeof defaultProps;

const defaultProps = { title: 'Remix Run' };
const Document = ({ children, title }: DocumentProps) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />

      {title ? <title>{title}</title> : null}
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === 'development' && <LiveReload />}
    </body>
  </html>
);

Document.defaultProps = defaultProps;

const Layout = ({ children }: React.PropsWithChildren<{}>) => (
  <Box display="flex" minHeight="100vh">
    {children}
  </Box>
);

/**
 * The root module's default export is a component that renders the current
 * route via the `<Outlet />` component. Think of this as the global layout
 * component for your app.
 */
const App = () => (
  <Document>
    <ThemeConfig>
      <Layout>
        <Outlet />
      </Layout>
    </ThemeConfig>
  </Document>
);

export default App;