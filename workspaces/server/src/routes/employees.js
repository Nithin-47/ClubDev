import { Router } from 'express';

const employeeRouter = Router();    
import { getAllEmployees, createNewEmployee, updateEmployee, deleteEmployee, getEmployeeById } from '../../controllers/employeesController';

import Roles from '../../config/roles_list';
import verifyRoles from '../../middleware/verifyRoles';

employeeRouter.route('/')
    .get(getAllEmployees)
    .post(verifyRoles(Roles.Admin,Roles.Editor),createNewEmployee)
    .put(verifyRoles(Roles.Admin,Roles.Editor),updateEmployee)
    .delete(verifyRoles(Roles.Admin),deleteEmployee);

employeeRouter.route('/:id')
    .get(getEmployeeById)

export default employeeRouter;