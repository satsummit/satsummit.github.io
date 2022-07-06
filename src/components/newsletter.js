import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import addToMailchimp from 'gatsby-plugin-mailchimp';

import { Form, FormInput, FormLabel } from '@devseed-ui/form';
import { glsp, themeVal, visuallyHidden } from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';
import { CollecticonArrowUpRight } from '@devseed-ui/collecticons';

const FormSignup = styled(Form)`
  position: relative;
`;

const FormGroupRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: ${glsp(0, 0.5)};

  ${FormInput} {
    width: 100%;
  }

  ${Button} {
    flex: 0 0 8rem;
    height: 100%;
  }
`;

const RegFormLabel = styled(FormLabel)`
  ${visuallyHidden()};
`;

const ErrorWrapper = styled.div`
  position: absolute;
  top: calc(100% + ${glsp(0.25)});
  padding: ${glsp(0.5, 1)};
  color: ${themeVal('color.surface')};

  &::before {
    position: absolute;
    bottom: 100%;
    left: ${glsp()};
    content: '';
    width: 1rem;
    height: 0.5rem;
    background: transparent;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
    pointer-events: none;
  }

  ${({ hasError }) =>
    hasError
      ? css`
          background: ${themeVal('color.danger')};

          &::before {
            background: ${themeVal('color.danger')};
          }
        `
      : css`
          background: ${themeVal('color.success')};

          &::before {
            background: ${themeVal('color.success')};
          }
        `}
`;

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [hasError, setError] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { msg, result } = await addToMailchimp(email, {});
      if (result !== 'success') throw msg;

      setError(false);
      setMessage(msg);
      setEmail('');
    } catch (error) {
      setError(true);
      setMessage(error);
    }
  };

  const handleChange = (evt) => {
    setEmail(evt.target.value);
  };

  return (
    <FormSignup onSubmit={handleSubmit}>
      <FormGroupRow>
        <RegFormLabel htmlFor='reg-email'>Email</RegFormLabel>
        <FormInput
          id='reg-email'
          isRequired
          onChange={handleChange}
          placeholder='you@provider.tld'
          type='email'
          size='large'
        />
        <Button variation='base-fill' size='large' type='submit'>
          <CollecticonArrowUpRight /> Sign up
        </Button>
      </FormGroupRow>
      {message ? (
        <ErrorWrapper hasError={hasError}>
          <p dangerouslySetInnerHTML={{ __html: message }} />
        </ErrorWrapper>
      ) : null}
    </FormSignup>
  );
}
