import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { InitRoutes } from './routes';

dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
	bodyParser.urlencoded({ extended: false })
);

app.use(bodyParser.json());

app.use(cors());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

InitRoutes(app);

app.listen(PORT, () => {
	console.log(`We're live in ${process.env.NODE_ENV} mode on port ${PORT}`);
});