import React, { useState } from 'react';
import addToMailchimp from 'gatsby-plugin-mailchimp';
import styled, { css } from 'styled-components';
import { Form, FormInput } from '@devseed-ui/form';
import { themeVal } from '@devseed-ui/theme-provider';
import { Button } from '@devseed-ui/button';

const ErrorWrapper = styled.div`
  ${({ hasError }) =>
    hasError
      ? css`
          background: ${themeVal('color.danger')};
        `
      : css`
          background: ${themeVal('color.info')};
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
    <Form onSubmit={handleSubmit}>
      <FormInput isRequired onChange={handleChange} />
      <Button type='submit'>Sign up</Button>
      {message ? (
        <ErrorWrapper hasError={hasError}>
          <p dangerouslySetInnerHTML={{ __html: message }} />
        </ErrorWrapper>
      ) : null}
    </Form>
  );
}
