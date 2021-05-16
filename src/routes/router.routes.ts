import { Express } from 'express';
import authRouter from './security/auth.routes';
import userRouter from './security/user.routes';
import AuthMiddleware from '../middlewares/auth.middleware';

const API_BASE = '/api/v1';
const auth = new AuthMiddleware();
export default (App: Express) => {
	App.use(`${API_BASE}/auth`, authRouter);
	//App.use(`${API_BASE}/users`, [ auth.getToken ], userRouter);
	App.use(`${API_BASE}/users`, userRouter);
};
