import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	Link as ChakraLink,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { NextPage } from 'next';
import Link from 'next/link';
import { auth } from '../firebase';
import { TOAST_POSITION, ERROR_TOAST_TITLE, SUCCESS_TOAST_TITLE } from '../utils/uiUtils';
import storage from '../utils/storage';
import Router from 'next/router';
import APP_ROUTES from '../utils/routes';

interface NewUser {
	fname: string;
	lname: string;
	email: string;
	password: string;
};

const SignUp: NextPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [user, setUser] = useState<NewUser>({ fname: '', lname: '', email: '', password: '' });
	const toast = useToast();

	// TODO: type 'e'
	const signUp = async (e: any) => {
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

		const { user: firebaseUser } = await auth.createUserWithEmailAndPassword(user.email, user.password);

		if (!firebaseUser) {
			toast({
				position: TOAST_POSITION,
				status: 'error',
				title: ERROR_TOAST_TITLE,
				description: 'Error creating firebase user!'
			});
			return;
		}

		await storage.setItem('user', firebaseUser);

		await auth.currentUser?.updateProfile({
			displayName: `${user.fname} ${user.lname}`
		});

		
		toast({
			position: TOAST_POSITION,
			title: SUCCESS_TOAST_TITLE,
			status: 'success',
			description: 'Account Created!'
		});
		
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
					<Heading fontSize={'4xl'} textAlign={'center'}>
						Sign up
					</Heading>
					<Text fontSize={'lg'} color={'gray.600'}>
						to enjoy all of our cool features ✌️
					</Text>
				</Stack>
				<Box
					rounded={'lg'}
					bg={useColorModeValue('white', 'gray.700')}
					boxShadow={'lg'}
					p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl id="firstName" isRequired>
									<FormLabel>First Name</FormLabel>
									<Input type="text" onChange={(e: any) => {
										setUser({ ...user, fname: e.currentTarget.value})
									}}/>
								</FormControl>
							</Box>
							<Box>
								<FormControl id="lastName">
									<FormLabel>Last Name</FormLabel>
									<Input type="text" onChange={(e: any) => {
										setUser({ ...user, lname: e.currentTarget.value })
									}}/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl id="email" isRequired>
							<FormLabel>Email address</FormLabel>
							<Input type="email" onChange={(e: any) => {
										setUser({ ...user, email: e.currentTarget.value })
									}}/>
						</FormControl>
						<FormControl id="password" isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input type={showPassword ? 'text' : 'password'} onChange={(e: any) => {
										setUser({ ...user, password: e.currentTarget.value })
									}}/>
								<InputRightElement h={'full'}>
									<Button
										variant={'ghost'}
										onClick={() =>
											setShowPassword((showPassword) => !showPassword)
										}>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText="Submitting"
								size="lg"
								bg={'blue.400'}
								color={'white'}
								_hover={{
									bg: 'blue.500',
								}}
								onClick={signUp}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={'center'}>
								Already a user? <Link href={APP_ROUTES.LOGIN} passHref={true}>
									<ChakraLink color={'blue.400'}>
										Login
									</ChakraLink>
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	)
}

export default SignUp;
