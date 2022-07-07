import React from 'react';

import Layout from '$components/layout';

import {
  PageLead,
  PageMainContent,
  PageMainHero,
  PageMainHeroHeadline,
  PageMainTitle
} from '$styles/page';

import { BlockAlpha } from '$styles/blocks';
import { VarProse } from '$styles/variable-components';

const CodeOfConductPage = () => {
  return (
    <Layout>
      <PageMainContent>
        <PageMainHero>
          <PageMainHeroHeadline>
            <PageMainTitle>Code of conduct</PageMainTitle>
            <PageLead>Our commitment to our community.</PageLead>
          </PageMainHeroHeadline>
        </PageMainHero>
        <BlockAlpha>
          <VarProse>
            <h2>Intro</h2>
            <p>
              We want <strong>SatSummit</strong> to offer a positive and safe
              environment for all attendees.
            </p>
            <p>
              <strong>Cyient</strong>, <strong>DevGlobal</strong> &{' '}
              <strong>Development Seed</strong> believe that more diverse teams
              build better products - we know that diverse representation at
              events leads to building a stronger community.
            </p>
            <p>
              We follow a <strong>Code of Conduct</strong> for our events in
              order to create the best experience possible for all attendees.
              Before you participate in <strong>SatSummit</strong>, we ask that
              you review the <strong>Code of Conduct</strong> below.
            </p>
            <p>
              We also support the{' '}
              <a href='https://diversitycharter.org/'>
                <strong>Diversity Charter</strong>
              </a>
              , a commitment to encourage diversity at all of our events.
            </p>
            <h2>The code</h2>
            <p>
              All attendees, speakers, sponsors, vendors, partners and
              volunteers at <strong>SatSummit</strong> are required to adhere to
              the following <strong>Code of Conduct</strong>.{' '}
              <strong>SatSummit</strong> event organizers will enforce this Code
              throughout the event.
            </p>
            <p>
              Our aim in hosting events is to build community. To that end, our
              goal is to create an environment where everyone feels welcome to
              participate, speak up, ask questions, and engage in conversation.
              We invite all those who participate in this event to help us
              create safe and positive experiences for everyone.
            </p>
            <p>
              <strong>SatSummit</strong> is dedicated to providing a
              harassment-free environment for everyone, regardless of race,
              color, religion, age, sex, sexual orientation, gender, gender
              identity, gender expression, national origin, ancestry,
              citizenship, immigration status, language use, familial status,
              military or veteran status, political activities or affiliation,
              physical or mental disability, medical condition, height, weight,
              personal appearance, HIV or AIDS status, or any other status
              protected by applicable law. We do not tolerate harassment of
              participants in any form. Sexual language and imagery is not
              appropriate during any aspect of the event, including talks,
              workshops, parties, social media such as Twitter, or other online
              media.
            </p>
            <h3>Expected behavior</h3>
            <ul>
              <li>
                Participate in an authentic and active way. In doing so, you
                contribute to the health and longevity of the community;
              </li>
              <li>
                Exercise consideration and respect in your speech and actions;
              </li>
              <li>Attempt collaboration before conflict;</li>
              <li>
                Refrain from demeaning, discriminatory, or harassing behavior
                and speech;
              </li>
              <li>
                Be mindful of your surroundings and of your fellow participants.
                Alert community leaders if you notice a dangerous situation,
                someone in distress, or violations of this{' '}
                <strong>Code of Conduct</strong>, even if they seem
                inconsequential.
              </li>
            </ul>
            <p>
              Conference participants who violate these rules may be sanctioned
              or expelled from the event/conference without a refund at the
              discretion of the organizers. Participants asked to stop any
              harassing behavior are expected to comply immediately.
            </p>
            <h3>Reporting an incident</h3>
            <p>
              If you see, overhear or experience a violation of the{' '}
              <strong>Code of Conduct</strong> during an event, please seek out
              the nearest <strong>Cyient</strong>, <strong>DevGlobal</strong> &{' '}
              <strong>Development Seed</strong> team member to escalate your
              complaint. If you cannot find a team member, or would like to
              report a violation after an event, you may email{' '}
              <a href='mailto:info@satsummit.io'>
                <strong>info@satsummit.io</strong>
              </a>
              .{' '}
            </p>
            <h3>Credits</h3>
            <p>
              This <strong>Code of Conduct</strong> was adapted from the
              following open resources, and may be used under a CC BY-SA 4.0
              license:
            </p>
            <ul>
              <li>
                The{' '}
                <a href='http://confcodeofconduct.com/' target='blank'>
                  <strong>Conference Code of Conduct</strong>
                </a>
                , licensed under a{' '}
                <a
                  href='https://creativecommons.org/licenses/by/3.  0/deed.en_US'
                  target='blank'
                >
                  Creative Commons Attribution 3.0
                </a>{' '}
                Unported license;{' '}
              </li>
              <li>
                The{' '}
                <a href='http://berlincodeofconduct.org/' target='blank'>
                  <strong>Berlin Code of Conduct</strong>
                </a>
                , licensed under a{' '}
                <a
                  href='https://creativecommons.org/licenses/by-sa/4.  0/'
                  target='blank'
                >
                  Creative Commons Attribution-ShareAlike 4.0 International (CC
                  BY-SA 4.0)
                </a>{' '}
                license.{' '}
              </li>
            </ul>
          </VarProse>
        </BlockAlpha>
      </PageMainContent>
    </Layout>
  );
};

export default CodeOfConductPage;
