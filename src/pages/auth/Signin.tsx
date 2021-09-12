import * as React from 'react';
import { Copyright } from '../../components/common/Copyright';
import { LockOpenOutlined as LockOutlinedIcon } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form';
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
	Theme,
	Typography
} from '@material-ui/core';


interface SigninProps {
	
}
 
const useStyles = makeStyles((theme: Theme) => ({
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Signin: React.FunctionComponent<SigninProps> = () => {
	const classes = useStyles();
	const { control, handleSubmit, formState: { errors }, clearErrors } = useForm();

	const onSubmit = (data: any) => {
		clearErrors();
		console.log(data);
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>

				<Typography component="h1" variant="h5">
					Sign in
				</Typography>

				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name="email"
						control={control}
						defaultValue=""
						rules={{
							required: true,
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: "invalid email address",
							},
						}}
						render={({ field }: any) =>
							<TextField
								{ ...field }
								variant="outlined"
								margin="normal"
								fullWidth
								id="email"
								required
								error={typeof(errors.email?.message) === 'string'}
								helperText={errors.email?.message ?? ''}
								register={TextField}
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
							/>
						}
					/>
					<Controller
						name="password"
						control={control}
						defaultValue=""
						render={({ field }: any) =>
							<TextField
								{...field}
								variant="outlined"
								margin="normal"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Forgot password?
							</Link>
						</Grid>
					</Grid>
				</form>
				
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
 
export default Signin;