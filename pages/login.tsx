import { NextPage } from 'next';
import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link as ChakraLink,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import APP_ROUTES from '../utils/routes';
import Router from 'next/router';
import { ERROR_TOAST_TITLE, TOAST_POSITION } from '../utils/uiUtils';
import { AuthContext } from '../context/authContext';

const LoginPage: NextPage = () => {
  const [user, setUser] = React.useState({ email: '', password: '' });
  const authContext = React.useContext(AuthContext);

  React.useEffect(() => {
    if (authContext.checkIfUserAuthenticated()) {
      Router.push(APP_ROUTES.HOME);
    }
  }, [authContext.user]);
  
	const toast = useToast();

  const login = async (e: any) => {
    e.preventDefault();

    if (!user || !user['email'] || !user['password']) {
			toast({
				position: TOAST_POSITION,
				status: 'error',
				title: ERROR_TOAST_TITLE,
				description: 'Email or password field can not be empty!'
			});
			return;
    }
    
    const firebaseUser = await authContext.login(user.email, user.password);

    if (!firebaseUser) {
      toast({
				position: TOAST_POSITION,
				status: 'error',
				title: ERROR_TOAST_TITLE,
				description: 'Invalid credentials!'
			});
			return;
    }

    Router.push(APP_ROUTES.HOME);
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool
            <ChakraLink color={'blue.400'}>
              &nbsp;features
            </ChakraLink> ✌️
            </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setUser({ ...user, email: e.currentTarget.value })}/>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setUser({ ...user, password: e.currentTarget.value })} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link href={APP_ROUTES.FORGOT_PASSWORD} passHref={true}>
                  <ChakraLink color={'blue.400'}>
                    Forgot password?
                  </ChakraLink>
                </Link>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={login}
              >
                Sign in
              </Button>
            </Stack>
            <Divider />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default LoginPage;
