import { handleUpload } from '../controllers/uploadController';
import { single } from '../middleware/upload';
import { Router } from 'express';
const router = Router();


router.post('/', single('image'), handleUpload);