
import { Router } from 'express'; 
const router = Router();
import path from 'path';

import { handleLogin } from '../controllers/authController';

router.post('/', handleLogin);

export default router;