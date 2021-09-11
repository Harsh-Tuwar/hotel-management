import * as React from 'react';
import { Typography, Link } from '@material-ui/core';

export interface CopyrightProps {
	
}
 
export const Copyright: React.SFC<CopyrightProps> = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				My Hotel
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}