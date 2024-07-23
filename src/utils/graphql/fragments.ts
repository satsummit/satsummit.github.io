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

export const editionContextualData = graphql`
  fragment EditionContextualData on Query {
    sponsors: allSponsor(
      sort: { slug: ASC }
      filter: {
        published: { eq: true }
        editions: { elemMatch: { edition: { cId: { eq: $editionCId } } } }
      }
    ) {
      nodes {
        id
        title
        slug
        url
        groupInEdition(editionCId: $editionCId)
        image {
          childImageSharp {
            gatsbyImageData(
              height: 56
              placeholder: BLURRED
              transformOptions: { fit: CONTAIN }
              formats: PNG
              backgroundColor: "#FFFFFF"
            )
          }
        }
      }
    }
    edition: edition(cId: { eq: $editionCId }) {
      name
      navigation {
        title
        url
        menu
      }
    }
  }
`;
