import * as React from 'react';
import { NextPage } from 'next';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { AuthContext } from '../context/authContext';
import Router from 'next/router';
import APP_ROUTES from '../utils/routes';
import { ERROR_TOAST_TITLE, SUCCESS_TOAST_TITLE, TOAST_POSITION } from '../utils/uiUtils';

type ForgotPasswordFormInputs = {
  email: string;
};

const ForgotPassword: NextPage = () => {
  const authContext = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const toast = useToast();

  React.useEffect(() => {
    if (authContext.checkIfUserAuthenticated()) {
      Router.push(APP_ROUTES.HOME);
    }
  }, [authContext.user]);

  const sendResetLink = async () => {
    if (!email) {
      toast({
				position: TOAST_POSITION,
				status: 'error',
				title: ERROR_TOAST_TITLE,
				description: 'Please type in the email address!'
			});
			return;
    }

    const test = await authContext.sendForgetPasswordLink(email);

    if (test === 'Sent') {
      toast({
				position: TOAST_POSITION,
				status: 'success',
				title: SUCCESS_TOAST_TITLE,
				description: 'Email Sent! Please check your inbox!'
      });
      Router.push(APP_ROUTES.LOGIN);
    } else {
      const errorMessage = test.substring(10);

      toast({
				position: TOAST_POSITION,
				status: 'error',
				title: ERROR_TOAST_TITLE,
				description: errorMessage
			});
    }
  }
  
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Forgot your password?
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          You&apos;ll get an email with a reset link
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            onChange={e => setEmail(e.currentTarget.value)}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={sendResetLink}
          >
            Request Reset
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

export default ForgotPassword;
