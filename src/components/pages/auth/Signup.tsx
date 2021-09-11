import * as React from 'react';
import { LockOutlined } from '@material-ui/icons';
import { Copyright  } from '../../common/Copyright';
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	Grid,
	Link,
	makeStyles,
	TextField,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export interface SignUpProps {
	
}
 
const SignUp: React.SFC<SignUpProps> = () => {
	const classes = useStyles();
	const [data, setData] = React.useState([]);

	const handleClick = async (e: any) => {
		e.preventDefault();
		fetch('/api/users').then(async (d) => {
			const t: any = await d.json();

			setData(t);
		}).catch(() => { });
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="fname"
							name="firstName"
							variant="outlined"
							required
							fullWidth
							id="firstName"
							label="First Name"
							autoFocus
						/>
						</Grid>
						<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="lastName"
							label="Last Name"
							name="lastName"
							autoComplete="lname"
						/>
						</Grid>
						<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
						/>
						</Grid>
						<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						</Grid>
						<Grid item xs={12}>
						</Grid>
					</Grid>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={(e) => handleClick(e)}
					>
						Sign Up
					</Button>
					<Grid container justifyContent="flex-end">
						<Grid item>
						<Link href="#" variant="body2">
							Already have an account? Sign in
						</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			{data && data.map((d: any) => d.name)}
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
}
 
export default SignUp;