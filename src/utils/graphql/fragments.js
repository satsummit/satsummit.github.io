import { graphql } from 'gatsby';

export const peopleFields = graphql`
  fragment PeopleFields on PeopleOrVoid {
    ... on People {
      title
      slug
      group
    }
    ... on VoidPeople {
      title
      isVoid
    }
  }
`;

export const allEventPeople = graphql`
  fragment AllEventPeople on EventPeople {
    hosts {
      ...PeopleFields
    }
    moderators {
      ...PeopleFields
    }
    panelists {
      ...PeopleFields
    }
    facilitators {
      ...PeopleFields
    }
    speakers {
      ...PeopleFields
    }
  }
`;
