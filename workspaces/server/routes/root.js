
import { Router } from 'express';
const router = Router();    
import path from 'path';



router.get('^/$', (req,res) => {
    res.send('Hello World');
}
);



export default router;