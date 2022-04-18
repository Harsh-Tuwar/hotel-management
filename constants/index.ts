import {
	FiHome,
	FiTrendingUp,
	FiCompass,
	FiStar,
	FiSettings,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface LinkItemProps {
	name: string;
	icon: IconType;
}

export const APP_NAME = "MyHotel";

export const SIDEBAR_LINKS: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome },
	{ name: 'Trending', icon: FiTrendingUp },
	{ name: 'Explore', icon: FiCompass },
	{ name: 'Favourites', icon: FiStar },
	{ name: 'Settings', icon: FiSettings },
];
