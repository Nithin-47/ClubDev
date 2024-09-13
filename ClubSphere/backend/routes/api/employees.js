
import { Router } from 'express';
const router = Router();    
import path from 'path';
import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployeeById } from '../../controllers/employeesController';

import ROLES_LIST from '../../config/roles_list';
import verifyRoles from '../../middleware/verifyRoles';


router.route('/')
.get(getAllEmployees)
.post(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),createNewEmployee)
.put(verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),updateEmployee)
.delete(verifyRoles(ROLES_LIST.Admin),deleteEmployee);

router.route('/:id')
.get(getEmployeeById)






export default router;