import Head from 'next/head';
import { APP_NAME } from '../../constants/index';

const Header = () => {
	return (
		<div>
			<Head>
				<title>{APP_NAME}</title>
				<meta property="og:title" content={APP_NAME} key="title" />
			</Head>
			<Head>
				<meta property="og:title" content="My new title" key="title" />
			</Head>
		</div>
	)
}

export default Header;
