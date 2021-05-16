import { Router } from 'express';
import authService from '../../services/security/auth.service';

const API_AUTH = Router();

API_AUTH.post('/login', authService.login);
API_AUTH.post('/token', authService.tokenRefresh);
API_AUTH.post('/recovery_password/:email', authService.recoveryPassword);
API_AUTH.put('/update_password', authService.updatePassword);
API_AUTH.delete('/logout', authService.logout);

export default API_AUTH;
