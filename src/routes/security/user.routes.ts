import { Router } from 'express';
import userService from '../../services/security/user.service';

const API_USER = Router();

API_USER.get('/getAll/', userService.getAll);
API_USER.get('/get/:id', userService.getbyId);
API_USER.post('/create/', userService.create);
API_USER.put('/update/:id', userService.update);
API_USER.put('/changePassword/:id', userService.changePassword);
API_USER.delete('/delete/:id', userService.deleteById);

export default API_USER;
