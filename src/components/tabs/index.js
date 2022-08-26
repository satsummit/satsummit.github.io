import React, { useEffect } from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import {
  themeVal,
  listReset,
  media,
  multiply
} from '@devseed-ui/theme-provider';

import { useTabs } from './tabs-context';
import { variableGlsp } from '$styles/variable-utils';
import { VarHeading } from '$styles/variable-components';
export * from './tabs-context';

// Use:
// <TabsManager>  --> Context provider. Doesn't render any wrapper
//   <TabsNav>  --> Nav list. Renders a Ul
//     <TabItem label='Tab 1' tabId='t1'>  --> List item. Renders li > a
//       Tab 1
//     </TabItem>
//     <TabItem label='Tab 2' tabId='t2'>
//       Tab 2
//     </TabItem>
//   </TabsNav>
//   <div>
//     <TabContent tabId='t1'>Tab 1 content</TabContent> --> Tab content. Renders a div when active.
//     <TabContent tabId='t2'>Tab 2 content</TabContent>
//   </div>
// </TabsManager>
//
// Since we're using context, there can be as may wrappers and elements between
// the tab navigation and the content.

const TabsList = styled.ul`
  ${listReset()};
  display: flex;
  flex-flow: row nowrap;
  background: ${themeVal('color.surface')};
  border-bottom: ${multiply(themeVal('layout.border'), 4)} solid
    ${themeVal('color.secondary-500')};
  margin-top: -${multiply(themeVal('layout.border'), 4)};
  grid-column: content-start / content-end;

  ${media.smallUp`
    justify-content: flex-end;
    margin-top: calc(${multiply(themeVal('layout.border'), 4)} - ${variableGlsp(
    2.75
  )});
  `}

  li {
    width: 50%;

    ${media.smallUp`
      width: auto;
    `}
  }
`;

const TabInnerContent = styled.section`
  grid-column: content-start / content-end;
  padding: ${variableGlsp(2, 0)};
`;

const TabbedContentListLink = styled(VarHeading).attrs({
  as: 'a',
  size: 'xsmall'
})`
  position: relative;
  display: block;
  text-align: center;
  font-weight: ${themeVal('button.type.weight')};
  text-decoration: none;
  border-radius: ${themeVal('shape.rounded')} ${themeVal('shape.rounded')} 0 0;
  border: 8px solid transparent;
  margin-bottom: -8px;
  transition: all 0.24s ease;
  color: ${themeVal('color.primary')};

  &:visited {
    color: inherit;
  }

  &:hover {
    color: ${themeVal('color.primary-400')};
  }

  ${({ active }) =>
    active &&
    css`
      border-color: ${themeVal('color.secondary-500')};

      > span {
        box-shadow: 0 8px 0 0 white;
      }
    `}

  * {
    line-height: 1;
  }

  > span {
    display: block;
    padding: ${variableGlsp(0.75)};
  }
`;

export function TabsNav(props) {
  const { children, ...rest } = props;

  return <TabsList {...rest}>{children}</TabsList>;
}

TabsNav.propTypes = {
  children: T.node
};

export function TabItem(props) {
  const { children, label, tabId, ...rest } = props;
  const { activeTab, setActiveTab, registerTab, unregisterTab } = useTabs();

  useEffect(() => {
    if (tabId) {
      registerTab({ id: tabId });
    }
    return () => {
      unregisterTab({ id: tabId });
    };
  }, [tabId, registerTab, unregisterTab]);

  return (
    <li>
      <TabbedContentListLink
        href='#'
        onClick={(e) => {
          e.preventDefault();
          setActiveTab(tabId);
        }}
        title={`Select ${label} tab`}
        active={activeTab === tabId}
        aria-selected={String(activeTab === tabId)}
        {...rest}
      >
        {children}
      </TabbedContentListLink>
    </li>
  );
}

TabItem.propTypes = {
  children: T.node,
  tabId: T.string.isRequired,
  label: T.string
};

export function TabContent(props) {
  const { children, tabId, ...rest } = props;
  const { activeTab } = useTabs();

  return (
    activeTab === tabId && (
      <TabInnerContent {...rest}>{children}</TabInnerContent>
    )
  );
}

TabContent.propTypes = {
  children: T.node,
  tabId: T.string.isRequired
};
