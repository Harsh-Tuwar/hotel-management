import {
	FiHome,
	FiSettings,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import APP_ROUTES from '../utils/routes';

interface LinkItemProps {
	name: string;
	icon: IconType;
	route: string;
}

export const APP_NAME = "MyHotel";

export const SIDEBAR_LINKS: Array<LinkItemProps> = [
	{
		name: 'Home',
		icon: FiHome,
		route: APP_ROUTES.HOME
	},
	{
		name: 'Settings',
		icon: FiSettings,
		route: APP_ROUTES.SETTINGS
	},
];
