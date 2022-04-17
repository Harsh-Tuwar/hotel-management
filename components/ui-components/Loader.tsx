import { Spinner, Stack } from '@chakra-ui/react'

export const Loader = () => {
	return (
		<Stack alignItems={'center'}  h='calc(100vh)' w='calc(100vw)'>
			<Spinner size='lg' />
		</Stack>
	);
}