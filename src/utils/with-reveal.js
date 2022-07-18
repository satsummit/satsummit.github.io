/* eslint-disable react/display-name, react/prop-types */
/**
 * Copied from https://github.com/rnosov/react-reveal/blob/98d5c86b9bc6f4d071cc3cb10cd2e9d5377d100a/src/lib/withReveal.js
 * Override needed to make it work with newer versions of react and styled components.
 */

import React from 'react';

function withReveal(WrappedComponent, effect) {
  const HocWrapped = ({ innerRef, ...props }) => (
    <WrappedComponent ref={innerRef} {...props} />
  );

  return function ({
    force,
    mountOnEnter,
    unmountOnExit,
    opposite,
    mirror,
    wait,
    onReveal,
    in: inProp,
    when,
    spy,
    collapse,
    onExited,
    enter,
    exit,
    appear,
    ...props
  }) {
    return (
      <effect.type
        force={force}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        opposite={opposite}
        mirror={mirror}
        wait={wait}
        onReveal={onReveal}
        in={inProp}
        when={when}
        spy={spy}
        collapse={collapse}
        onExited={onExited}
        enter={enter}
        exit={exit}
        appear={appear}
        {...effect.props}
        refProp='innerRef'
      >
        <HocWrapped {...props} />
      </effect.type>
    );
  };
}

export default withReveal;
