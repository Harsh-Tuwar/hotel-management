import express from 'express';
import * as Home from '../controllers/Home';

export const InitRoutes = (app: express.Express) => {
	app.get('/api/users', Home.Init)
}