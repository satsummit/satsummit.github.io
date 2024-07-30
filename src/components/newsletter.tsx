import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormLabelProps,
  Heading,
  Input,
  InputProps,
  Text
} from '@chakra-ui/react';
import { Fold } from './fold';
import { useEditionCId } from '$context/edition';

const LEGITIMATE_INTEREST_CONSENT_TEXT =
  'By clicking subscribe, you consent to allow SatSummit to store and process the personal information submitted to provide you the content requested.';

// Hubspot API
const postToHubspot = async (data: object = {}) => {
  return fetch(
    'https://api.hsforms.com/submissions/v3/integration/submit/23425005/6b645de9-9340-4d5a-acd5-c5896215cefb',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data,
        legalConsentOptions: {
          legitimateInterest: {
            // This must be true when using the 'legitimateInterest' option, as it
            // reflects the consent indicated by the visitor when submitting the form
            value: true,
            // Integer; The ID of the specific subscription type that this forms
            // indicates interest to.
            subscriptionTypeId: 999,
            // String, one of CUSTOMER or LEAD; Whether this form indicates legitimate
            // interest from a prospect/lead or from a client.
            legalBasis: 'CUSTOMER',
            // String; The privacy text displayed to the visitor.
            text: LEGITIMATE_INTEREST_CONSENT_TEXT
          }
        }
      })
    }
  );
};

const FormLabelStyled = (props: FormLabelProps) => (
  <FormLabel
    fontWeight='600'
    textTransform='uppercase'
    fontFamily='Barlow Condensed, serif'
    {...props}
  />
);

const InputStyled = (props: InputProps) => (
  <Input bg='white' borderRadius='sm' borderWidth='2px' {...props} />
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

    // Send the form data to the Hubspot API
    const postData = async () => {
      setStatus('LOADING');

      const response = await postToHubspot({
        fields: [
          {
            objectTypeId: '0-1',
            name: 'email',
            value: formValues.email
          },
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
    <Box
      as='section'
      bg='base.50'
      px={{ base: '4', md: '8' }}
      pt={{ base: '8', lg: '16' }}
      display='flex'
      flexFlow='column'
      gap={{ base: '8', lg: '16' }}
    >
      <Fold spacingY={{ base: '4', lg: '8' }} w='100%'>
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
                <FormControl
                  gridColumn={{
                    base: 'span 2',
                    lg: 'span 1'
                  }}
                  isDisabled={isSubmitting}
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
                </FormControl>
                <FormControl
                  gridColumn={{
                    base: 'span 2',
                    lg: 'span 1'
                  }}
                  isDisabled={isSubmitting}
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
                </FormControl>
                <FormControl
                  gridColumn='span 2'
                  isRequired
                  isDisabled={isSubmitting}
                  isInvalid={!!formErrors.email}
                >
                  <FormLabelStyled>Email</FormLabelStyled>
                  <InputStyled
                    placeholder='Email'
                    value={formValues.email}
                    onChange={(e) => {
                      setFormValues({ ...formValues, email: e.target.value });
                      setFormErrors({ email: '' });
                    }}
                  />
                  {formErrors.email && (
                    <FormErrorMessage>
                      A valid email is required.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Flex gap={4} alignItems='center'>
                  <Button
                    colorScheme='primary'
                    flexShrink={0}
                    onClick={onSubmit}
                    isDisabled={isSubmitting}
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
      <Divider borderColor='base.200a' size='md' maxW='container.xl' m='auto' />
    </Box>
  );
}
