
import { Router } from 'express'; 
const router = Router();
import path from 'path';

import { handleLogout } from '../controllers/logoutController';

router.get('/', handleLogout);

export default router;