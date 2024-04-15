import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import SmartLink from '$components/smart-link';

export function LinkedSpeaker(props: { name: string }) {
  const { name } = props;

  const data = useStaticQuery<{
    allPeople: { nodes: Queries.People[] };
  }>(graphql`
    query {
      allPeople {
        nodes {
          slug
          title
          group
        }
      }
    }
  `);

  const person = data.allPeople.nodes.find((p) => p.title === name);

  if (!person || person.group !== 'main') {
    return <strong>{name}</strong>;
  }

  return (
    <SmartLink to={`/speakers/${person.slug}`}>
      <strong>{name}</strong>
    </SmartLink>
  );
}
