export const createLetterSchema = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `
    type MediaUrl {
      src: File! @fileByRelativePath
    }

    type EditionNavigation {
      title: String!
      path: String!
      comingSoon: Boolean
    }

    type Edition implements Node {
      cId: String!
      published: Boolean!
      slug: String!
      weight: Int!

      name: String!
      dates: [Date!] @dateformat
      card: MediaUrl
      navigation: [EditionNavigation!]
    }

    type LetterEdition {
      edition: Edition! @link(by: "cId")
    }

    type Letter implements Node {
      cId: String!
      published: Boolean!
      slug: String!
      weight: Int!

      title: String!
      lead: String
      editions: [LetterEdition]
    }

    type UpdatesEdition {
      edition: Edition! @link(by: "cId")
    }

    type Updates implements Node {
      cId: String!
      published: Boolean!
      slug: String!
      weight: Int!

      title: String!
      date: Date @dateformat
      description: String
      editions: [UpdatesEdition!]
      cover: MediaUrl
      tags: [String!]
    }
    `
  ];

  createTypes(typeDefs);
};

export const createEventSchema = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: 'Event',
      fields: {
        cId: 'String!',
        published: 'Boolean!',
        slug: 'String!',
        weight: 'Int!',
        title: 'String!',
        fringe: {
          type: 'Boolean!',
          resolve: (source) => !!source.fringe
        },
        date: 'Date!',
        room: 'String',
        edition: {
          type: 'Edition',
          extensions: {
            link: {
              by: 'cId'
            }
          }
        },
        people: {
          type: 'EventPeople',
          // Attach the edition so that the EventPeople interface can filter
          // by edition.
          resolve: (source) => ({
            ...source.people,
            __edition: source.edition
          })
        }
      },
      interfaces: ['Node']
    })
  ];

  createTypes(typeDefs);
};

export const createPeopleSchema = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `
    type RoleInEvent {
      role: String!
      event: Event
    }

    type SocialConnections {
      x: String
      linkedin: String
    }
  `,
    schema.buildObjectType({
      name: 'People',
      fields: {
        cId: 'String!',
        published: 'Boolean!',
        slug: 'String!',
        weight: 'Int!',
        title: 'String!',
        company: 'String!',
        role: 'String!',
        social: 'SocialConnections',
        avatar: {
          type: 'File',
          extensions: {
            fileByRelativePath: {}
          }
        },
        pronouns: 'String',
        group: {
          type: 'String',
          resolve: (source) => source.group || 'main'
        },
        edition: {
          type: 'Edition',
          extensions: {
            link: {
              by: 'cId'
            }
          }
        },

        // Foreign relationship between people and events. This is not a
        // straightforward relation because we need to know what is the role
        // that the person plays in the event.
        events: {
          type: '[RoleInEvent!]',
          args: {
            editionCId: 'String'
          },
          resolve: async (source, args, context) => {
            const results = await Promise.all([
              searchEventForRole('hosts', source, context),
              searchEventForRole('moderators', source, context),
              searchEventForRole('panelists', source, context),
              searchEventForRole('facilitators', source, context),
              searchEventForRole('speakers', source, context)
            ]);

            const sorted = [...results.flat()].sort((a, b) => {
              const dateA = a.event.date;
              const dateB = b.event.date;

              return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
            });

            // Filter by edition if provided.
            return args.editionCId
              ? sorted.filter(({ event }) => event.edition === args.editionCId)
              : sorted;
          }
        }
      },
      interfaces: ['Node']
    })
  ];

  createTypes(typeDefs);
};

export const createEventPeopleRelSchema = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    // Each event has people associated to it in one of the following roles:
    // hosts, moderators, panelists, facilitators, speakers.
    // Each one of these is a list of people names:
    // people:
    //   hosts:
    //     - name 1
    //     - name 2
    //
    // The names are then used to establish a relationship with the People
    // content-type to be able to link to a person's page.
    // However, there may be names for which there is no page. In these cases we
    // want to display the name as well, but not link it to anywhere. By default
    // Gatsby will return null when a relationship is not found.

    // The ideal solution would be to return a People if found, and leave the
    // name string untouched if the relationship is not found. This would
    // require the return type to be a union between People and String which is
    // not possible because graphQl doesn't allow unions with Scalar types (like
    // String, Boolean).

    // The alternative is to return a union between 2 interfaces:
    // - People for when a relationship if found;
    // - VoidPeople when it is just a name with no relationship.

    // The VoidPeople is just defined by a `isVoid` field and the name of the
    // person under `title`.
    schema.buildObjectType({
      name: 'VoidPeople',
      fields: {
        title: 'String!',
        isVoid: {
          type: 'Boolean',
          resolve: () => true
        }
      }
    }),

    // The union is resolved taking the `isVoid` property into account.
    schema.buildUnionType({
      name: 'PeopleOrVoid',
      types: ['People', 'VoidPeople'],
      resolveType: (value) => (value?.isVoid ? 'VoidPeople' : 'People')
    }),

    // The resolver is the same for each people role. For each entry, search for
    // a relationship. Return it if found, otherwise return the structure of a
    // VoidPeople.
    schema.buildObjectType({
      name: 'EventPeople',
      fields: {
        hosts: eventPeopleResolver('hosts'),
        moderators: eventPeopleResolver('moderators'),
        panelists: eventPeopleResolver('panelists'),
        facilitators: eventPeopleResolver('facilitators'),
        speakers: eventPeopleResolver('speakers')
      }
    })
  ];

  createTypes(typeDefs);
};

export const createSponsorSchema = ({ actions, schema }) => {
  const { createTypes } = actions;
  const typeDefs = [
    `
      type SponsorEdition {
        edition: Edition! @link(by: "cId")
        group: String!
      }
    `,
    schema.buildObjectType({
      name: 'Sponsor',
      fields: {
        cId: 'String!',
        published: 'Boolean!',
        slug: 'String!',
        weight: 'Int!',
        title: 'String',
        url: 'String',
        image: {
          type: 'File',
          extensions: {
            fileByRelativePath: {}
          }
        },
        editions: '[SponsorEdition]',
        groupInEdition: {
          type: 'String',
          args: {
            editionCId: 'String'
          },
          resolve(source, args) {
            const edition = source.editions?.find(
              ({ edition }) => edition === args.editionCId
            );
            return edition?.group || null;
          }
        }
      },
      interfaces: ['Node']
    })
  ];

  createTypes(typeDefs);
};

/**
 * Search for all the Events where a given person (person.slug), plays the given role
 */
const searchEventForRole = async (role, person, context) => {
  const { entries } = await context.nodeModel.findAll({
    type: 'Event',
    query: {
      filter: {
        edition: { cId: { eq: person.edition } }
      },
      sort: { date: 'ASC' }
    }
  });

  const events = Array.from(entries);

  // Since people on the Event type is a Union it is not possible to filter on
  // it. Doing it manually.
  const filtered = events.filter((event) =>
    // The raw event object still has people as simple arrays of strings.
    event.people?.[role]?.includes(person.slug)
  );

  return filtered.map((event) => ({ role, event }));
};

/**
 * For each name, search for a corresponding People object. Return it if found,
 * otherwise map the missing value to a VoidPeople.
 */
const eventPeopleResolver = (role) => {
  return {
    type: '[PeopleOrVoid]',
    resolve: async (source, args, context) => {
      const peopleList = source[role];

      if (!peopleList) return [];

      const { entries } = await context.nodeModel.findAll({
        type: 'People',
        query: {
          filter: {
            title: { in: peopleList },
            edition: { cId: { eq: source.__edition } }
          }
        }
      });

      const queryResult = Array.from(entries);

      return peopleList.map((title) => {
        return (
          queryResult.find((obj) => obj.title === title) || {
            title,
            isVoid: true
          }
        );
      });
    }
  };
};
