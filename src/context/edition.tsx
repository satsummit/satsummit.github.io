import { PageProps } from 'gatsby';
import React, { createContext, useContext } from 'react';

interface EditionContextProps {
  sponsors?: Queries.EditionContextualDataFragment['sponsors']['nodes'];
  edition?: Queries.EditionContextualDataFragment['edition'];
  editionCId?: string;
}

const EditionContext = createContext<EditionContextProps>({});

export function EditionContextProvider(props: {
  children: React.ReactNode;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  pageProps?: PageProps<any, any>;
}) {
  const { pageProps, children } = props;
  const context: EditionContextProps = {
    editionCId: pageProps?.pageContext.editionCId,
    sponsors: pageProps?.data?.sponsors?.nodes,
    edition: pageProps?.data?.edition
  };

  return (
    <EditionContext.Provider value={context}>
      {children}
    </EditionContext.Provider>
  );
}

export function useEditionContext(throwIfUndefined = false) {
  const ctx = useContext(EditionContext);

  if (throwIfUndefined && !ctx.editionCId) {
    throw new Error(
      'No editionCId set in the global context. Did you forget to pass pageProps={props} to <Layout>?'
    );
  }

  return ctx;
}

export function useEditionCId() {
  return useEditionContext().editionCId;
}
