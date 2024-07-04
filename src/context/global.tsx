import { PageProps } from 'gatsby';
import React, { createContext, useContext } from 'react';

interface GlobalContextProps {
  sponsors?: Queries.SponsorsDataFragment['sponsors']['nodes'];
  editionCId?: string;
}

const GlobalContext = createContext<GlobalContextProps>({});

export function GlobalContextProvider(props: {
  children: React.ReactNode;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  pageProps?: PageProps<any, any>;
}) {

  const { pageProps, children } = props;
  const context = {
    editionCId: pageProps?.pageContext.editionCId,
    sponsors: pageProps?.data?.sponsors?.nodes
  };

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const ctx = useContext(GlobalContext);

  if (!ctx.editionCId) {
    throw new Error(
      'No editionCId set in the global context. Did you forget to pass pageProps={props} to <Layout>?'
    );
  }

  return ctx;
}

export function useEditionCId() {
  return useGlobalContext().editionCId;
}
