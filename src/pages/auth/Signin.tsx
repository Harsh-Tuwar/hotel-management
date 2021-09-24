import * as React from 'react';
import { Copyright } from '../../components/common/Copyright';
import PropTypes from 'prop-types';
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
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { loginUser } from '../../redux/modules/auth/authActions';

interface SigninProps {}
 
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

	const onSubmit = async (data: any) => {
		clearErrors();
		
		data.email = 'tester@99.ca';
		data.password = 'tester@99';

		// await FBAuth.login(data.email, data.password);
		await loginUser(data.email, data.password);
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
						defaultValue="tester@99.ca"
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
						defaultValue="tester@99"
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


Signin.propTypes = {
	loginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state: AppState) => ({
	auth: state.auth
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		loginUser
	}
}
 
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Signin);