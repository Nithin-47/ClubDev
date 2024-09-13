
import { Router } from 'express'; 
const router = Router();
import path from 'path';

import { handleRefreshToken } from '../controllers/refreshTokenController';

router.get('/', handleRefreshToken);

export default router;