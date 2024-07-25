<p align="center">
  <a href="https://satsummit.io">
    <img alt="Satsummit satellite icon" src="../static/meta/icon-192.png" width="60" />
  </a>
</p>
<h1 align="center">
  Documentation
</h1>

This guide will cover the organization of the website and how to add content.  
This is written with the developer in mind, so some technical knowledge is assumed. 

**Table of Contents**
- [Site and Page structure](#site-and-page-structure)
  - [Global pages](#global-pages)
  - [Edition pages](#edition-pages)
  - [Letter pages](#letter-pages)
- [Content types](#content-types)
  - [Editions](#editions)
  - [Letters](#letters)
  - [People](#people)
  - [Events](#events)
  - [Sponsors](#sponsors)
  - [Updates](#updates)
- [Creating a new edition](#creating-a-new-edition)
- [Edition pages and context data](#edition-pages-and-context-data)


## Site and Page structure

The Satsummit website is a hub for all the Satsummit editions. Some pages refer to the event itself and other pages refer to each edition.

### Global pages

The global pages belong to the event itself and can be seen as meta pages.  
Any page in `src/pages` is a global page unless under a specific edition directory.

There are also some dynamic global pages (the updates pages), created through the `createPages` API. See `gatsby-node/updates-pages.mjs`.

### Edition pages

Each edition has its own directory under `src/pages/<edition cId>`.  
Any page added here will belong to that edition and the variable `editionCId` is injected into the page context for use in the queries. This is being done in `gatsby-node/edition-pages.mjs`.

The dynamic pages for each edition, like the speaker pages, agenda pages, etc., are created through the `createPages` API. See `gatsby-node/edition-pages.mjs`.

### Letter pages

Letter pages is the name given to the pages generated form the `letter` content type.  
These pages are just MDX pages and can be global or edition specific. This is controlled by the `editions` field in the frontmatter (More on this later).

## Content types

### Editions

Editions are the main content type for the website.  
They are defined using a yaml file in `content/editions` with the name `<year>-<location>.yml`. This will become the `cId` (content Id) of the edition and is used to link content to a specific edition.

| Property           | Description                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------- |
| name               | Name of the edition. Usually `<location> <short year>` (Ex: `Washington '24`).                              |
| dates[]            | List of dates for the event.                                                                                |
| card.src           | Relative url for the image to use in the edition card.                                                      |
| navigation         | List of menu items for this edition. This controls what navigation is shown on the header and footer menus. |
| navigation[].title | Title of the menu link.                                                                                     |
| navigation[].url   | Url for the menu link. Can be internal or external.                                                         |
| navigation[].menu  | Which menu to show this link on. One of "header", "footer", "both".                                         |

Starter template for an edition yaml file:

```yaml
name: 
dates:
  - 'YYYY-MM-DD'
navigation:
  - title: Agenda
    url: /<EDITION_CID>/agenda
    menu: both
  - title: Speakers
    url: /<EDITION_CID>/speakers
    menu: both
```

### Letters

The letter content type is used to easily create standalone text pages, like "Terms and Conditions" or "Code of Conduct".  
They can be global or edition specific. The content is written in MDX.


> [!NOTE]
> The file name is used as the `cId` and path for the page. If multiple editions need the a page with the same url, you can create a subdirectory and place the letter page inside.  
> If the page has the edition set in the frontmatter, the page will be automatically created under the `/<edition cId>` path prefix.

Frontmatter fields:

| Property           | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| title              | Name of the page.                                                           |
| lead               | Description of the page to show in the page hero and as a meta description. |
| editions           | Editions this letter belongs to.                                            |
| editions[].edition | cId of the edition.                                                         |

### People

The people content type is used to define the participants of the event.  
Each person belongs to a single edition and their file must be stored under `content/people/<edition cId>/<person name>.mdx`. This is what defines which edition the person is participating in.  
If the same person participates in multiple editions, they must have a separate file for each edition.

The content (person's bio) is written in MDX.

Frontmatter fields:

| Property        | Description                                   |
| --------------- | --------------------------------------------- |
| title           | Name of the person.                           |
| company         | The company this person works for/represents. |
| role            | The role at the company.                      |
| social          | List of social network's usernames.           |
| social.x        | Username for X.                               |
| social.linkedin | Username for Linkedin.                        |
| avatar          | Local url for this person's picture.          |
| pronouns        | Person's pronouns.                            |

### Events

The events content type is used to define the event's schedule, which can be part of the main event or fringe events.  
Each event's file must be stored under `content/events/<edition cId>/<event name>.mdx`. The event should be named `<day>-<hour>-<slug>.mdx` (Ex: `16-0800-breakfast.mdx`).

The event's content is written in MDX.

Frontmatter fields:

| Property            | Description                                                                                                                                    |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| title               | Name of the event.                                                                                                                             |
| type                | Type of the event. This is not fixed and may change from edition to edition.                                                                   |
| date                | Date and time of the event.                                                                                                                    |
| fringe              | Whether or not the event is a fringe event. <br/> Fringe events are shown under `<edition cId>/fringe` and do not belong to the main schedule. |
| room                | Name of the space where the event happens. This is not fixed and may change from edition to edition.                                           |
| people              | Participants of the event grouped by their role. Use the participant's slug (the file name).                                                   |
| people.speakers     | Participants with the role of speakers.                                                                                                        |
| people.moderators   | Participants with the role of moderators.                                                                                                      |
| people.panelists    | Participants with the role of panelists.                                                                                                       |
| people.facilitators | Participants with the role of facilitators.                                                                                                    |
| people.hosts        | Participants with the role of hosts.                                                                                                           |

> [!IMPORTANT]
> It is possible to have a participant without a dedicated speaker page. In that case use the person's name as you want it to be displayed.

### Sponsors

The sponsors content type is used to define the entities that support the event.  
Their logo is shown in the footer of the edition they're supporting.

Frontmatter fields:

| Property           | Description                                                 |
| ------------------ | ----------------------------------------------------------- |
| title              | Name of the sponsor.                                        |
| url                | Url of the sponsor's website.                               |
| image              | Local url for the sponsor logo                              |
| editions           | Editions this entity is supporting and their sponsor level. |
| editions[].edition | cId of the edition.                                         |
| editions[].group   | Sponsor level. This may vary edition by edition.            |

> [!IMPORTANT]
> If the sponsor's groups are different for a given edition, the sponsors fold needs to be updates to accommodate them. This is done in `src/components/sponsors-fold.tsx`.

### Updates

Updates are the chronological content for the website (a.k.a. blog posts).  
This content type is global, but can be linked to an edition for context. Content is written in MDX.

Each update should be created as an `index.mdx` file in a directory named `<date>-<slug>` under `content/updates`.  
Within this directory, you can add any assets or additional content needed for the post.

Frontmatter fields:

| Property           | Description                                                                                                                            |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| title              | The title of the blog post.                                                                                                            |
| description        | Description to be shown on the post card if defined. When not defined an excerpt is used.                                              |
| date               | The file name should define the post date, but in case of need it can be overridden with this property.                                |
| cover.url          | Relative url for the image to use in the post card and page hero.                                                                      |
| editions           | Editions this post relates to. <br/> Used to show an edition tag on the post header and to link the content on the edition's homepage. |
| editions[].edition | cId of the edition.                                                                                                                    |


## Creating a new edition

To add a new edition to the event, follow these steps:

1. Create a new edition yaml file in `content/editions` with the [content listed above](#editions).
2. Create a new edition index page under `src/pages/<edition cId>`. Use the template below.
3. Start adding content to the new edition.


## Edition pages and context data

> [!IMPORTANT]
> Each edition specific page must start from the template below.
> The page must query the data defined by the `EditionContextualData` fragment (see `src/utils/graphql/fragments.ts`) and then pass the props to the `PageLayout`.

```jsx
import React from 'react';
import { PageProps, graphql, type HeadFC } from 'gatsby';

import PageLayout from '$components/page-layout';
import Seo from '$components/seo';

export default function EditionPage(props: PageProps) {
  return (
    <PageLayout pageProps={props}>
      content goes here
    </PageLayout>
  );
}

export const pageQuery = graphql`
  query ($editionCId: String = "") {
    ...EditionContextualData
  }
`;

export const Head: HeadFC = () => <Seo title='Edition Page' />;
```

The page layout component will then store this data in the edition context for use in components that are common to all edition pages, like the sponsors fold, or to show the edition name in the navigation.  
See the available context methods in `src/context/edition.tsx`.