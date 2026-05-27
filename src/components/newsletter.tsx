import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Separator,
  Flex,
  Heading,
  Input,
  type InputProps,
  Text,
  Field,
  FieldLabelProps
} from '@chakra-ui/react';

import { Fold } from './fold';
import { useEditionCId } from '$context/edition';

const LEGITIMATE_INTEREST_CONSENT_TEXT =
  'By clicking subscribe, you consent to allow SatSummit to store and process the personal information submitted to provide you the content requested.';

const postToHubspot = async (data: object = {}) => {
  return fetch(
    'https://api.hsforms.com/submissions/v3/integration/submit/23425005/aca91298-766e-49df-bedb-64d07e7190d3',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        legalConsentOptions: {
          legitimateInterest: {
            value: true,
            subscriptionTypeId: 999,
            legalBasis: 'CUSTOMER',
            text: LEGITIMATE_INTEREST_CONSENT_TEXT
          }
        }
      })
    }
  );
};

const FormLabelStyled = (props: FieldLabelProps) => (
  <Field.Label
    fontWeight='600'
    textTransform='uppercase'
    fontFamily='Barlow Condensed, serif'
    fontSize='md'
    {...props}
  />
);

const InputStyled = (props: InputProps) => (
  <Input
    bg='white'
    borderRadius='xs'
    borderWidth='2px'
    fontSize='md'
    {...props}
  />
);

export function Newsletter() {
  const editionCId = useEditionCId();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [formErrors, setFormErrors] = useState({
    email: ''
  });

  const [reqStatus, setStatus] = useState<
    'IDLE' | 'LOADING' | 'ERROR' | 'SUCCESS'
  >('IDLE');

  const onSubmit = useCallback(() => {
    setFormErrors({ email: '' });

    if (!formValues.email || !/^\S+@\S+\.\S+$/.test(formValues.email)) {
      setFormErrors({ email: 'Invalid email address' });
      return;
    }

    const postData = async () => {
      setStatus('LOADING');

      const response = await postToHubspot({
        fields: [
          { objectTypeId: '0-1', name: 'email', value: formValues.email },
          {
            objectTypeId: '0-1',
            name: 'firstname',
            value: formValues.firstName
          },
          {
            objectTypeId: '0-1',
            name: 'lastname',
            value: formValues.lastName
          }
        ],
        context: {
          pageUri: 'https://satsummit.io',
          pageName: editionCId ? `Satsummit - ${editionCId}` : 'Satsummit'
        }
      });

      if (!response.ok || response.status >= 400) {
        setStatus('ERROR');
        return;
      }

      setStatus('SUCCESS');
    };

    postData();
  }, [formValues, editionCId]);

  const isSubmitting = reqStatus === 'LOADING';

  return (
    <Flex
      as='section'
      bg='basi.50'
      px={{ base: '4', md: '8' }}
      pt={{ base: '8', lg: '16' }}
      flexFlow='column'
      gap={{ base: '8', lg: '16' }}
      id='newsletter-fold'
    >
      <Fold rowGap={{ base: '4', lg: '8' }} w='100%'>
        <Heading as='h2' size='2xl' gridColumn='1/-1'>
          Get the newsletter
        </Heading>
        {reqStatus === 'SUCCESS' ? (
          <Box gridColumn='1/-1' display='flex' justifyContent='center'>
            <Text maxW='30rem' textAlign='center'>
              Thank you for subscribing the newsletter! We will keep you updated
              with the latest news.
            </Text>
          </Box>
        ) : (
          <>
            <Box
              gridColumn={{
                base: '1/-1',
                md: 'span 5',
                lg: 'span 6'
              }}
            >
              <Box
                as='form'
                display='grid'
                gridTemplateColumns='1fr 1fr'
                gap={5}
              >
                <Field.Root
                  gap={2}
                  gridColumn={{ base: 'span 2', lg: 'span 1' }}
                  disabled={isSubmitting}
                >
                  <FormLabelStyled>First name</FormLabelStyled>
                  <InputStyled
                    placeholder='First name'
                    value={formValues.firstName}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        firstName: e.target.value
                      });
                    }}
                  />
                </Field.Root>
                <Field.Root
                  gap={2}
                  gridColumn={{ base: 'span 2', lg: 'span 1' }}
                  disabled={isSubmitting}
                >
                  <FormLabelStyled>Last name</FormLabelStyled>
                  <InputStyled
                    placeholder='Last name'
                    value={formValues.lastName}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        lastName: e.target.value
                      });
                    }}
                  />
                </Field.Root>
                <Field.Root
                  gridColumn='span 2'
                  required
                  disabled={isSubmitting}
                  invalid={!!formErrors.email}
                  gap={2}
                >
                  <FormLabelStyled>
                    Email <Field.RequiredIndicator />
                  </FormLabelStyled>
                  <InputStyled
                    placeholder='Email'
                    value={formValues.email}
                    onChange={(e) => {
                      setFormValues({ ...formValues, email: e.target.value });
                      setFormErrors({ email: '' });
                    }}
                  />
                  {formErrors.email && (
                    <Field.ErrorText>
                      A valid email is required.
                    </Field.ErrorText>
                  )}
                </Field.Root>
                <Flex gap={4} alignItems='center'>
                  <Button
                    colorPalette='primary'
                    flexShrink={0}
                    onClick={onSubmit}
                    disabled={isSubmitting}
                  >
                    Subscribe
                  </Button>
                  {reqStatus === 'ERROR' && (
                    <Text color='red.500' fontSize='sm'>
                      Something went wrong. Try again later.
                    </Text>
                  )}
                </Flex>
              </Box>
            </Box>
            <Box
              gridColumn={{
                base: '1/-1',
                md: 'span 3',
                lg: 'span 3'
              }}
              fontSize='sm'
            >
              <Text fontSize='xs' mb={4}>
                * Required fields.
              </Text>
              <Text>{LEGITIMATE_INTEREST_CONSENT_TEXT}</Text>
            </Box>
          </>
        )}
      </Fold>
      <Separator
        borderColor='basi.200a'
        size='md'
        maxW='7xl'
        m='auto'
        width='100%'
      />
    </Flex>
  );
}
