import { Flex, FlexProps, Icon, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactText } from 'react';
import { IconType } from 'react-icons';

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
	route: string;
}
const NavItem = ({ icon, children, route, ...rest }: NavItemProps) => {
	const router = useRouter();

	return (
		<Link href={route}>
			<ChakraLink style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }} borderBottom={"1px solid black"}>
				<Flex
					align="center"
					p="4"
					mx="4"
					my="2"
					borderRadius="lg"
					role="group"
					cursor="pointer"
					bg={router.pathname === route ? 'cyan.400' : 'white'}
					color={router.pathname === route ? 'white' : 'black'}
					_hover={{
						bg: router.pathname === route ? '' : 'cyan.400',
						color: router.pathname === route ? '' : 'white',
					}}
					{...rest}>
					{icon && (
						<Icon
							mr="4"
							fontSize="16"
							_groupHover={{
								color: 'white',
							}}
							as={icon}
						/>
					)}
					{children}
				</Flex>
			</ChakraLink>
		</Link>
	);
};

export default NavItem;
