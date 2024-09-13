import { Router } from 'express';
const router = Router();    
import path from 'path';


import ROLES_LIST from '../../config/roles_list';
import verifyRoles from '../../middleware/verifyRoles';

import { getClubs, createNewClub, getSpecificClub } from '../../controllers/clubsController';
import { single } from '../../middleware/upload';


// const some = (req,res,next) => {
//     console.log(req.body);
//     next();
// }


router.route('/')
.get(getClubs)
.post(single('image'),createNewClub)


router.route('/:name')
.get(getSpecificClub)



export default router;

// upload.single('image'),
//verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),