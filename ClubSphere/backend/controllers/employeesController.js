// const data = {
//     employees: require('../model/data.json'),
//     setEmployees: function(data) {
//         this.employees = data;
//     }
// }



// const getAllEmployees = (req,res) => {
//     res.json(data.employees);
// }

// const createNewEmployee = (req,res) => {
//     const newEmployee = {
//         "id": data.employees[data.employees.length-1].id + 1 || 1,
//         "name": req.body.name,
//         "email": req.body.email
//     }

//     if(!newEmployee.name || !newEmployee.email) {
//         return res.status(400).json({'msg': 'Please include a name and email'})
//     }

//     data.setEmployees([...data.employees,newEmployee]);
//     res.status(201).json(data.employees);
// }

// const updateEmployee = (req,res) => {
//     const employee = data.employees.find(employee => employee.id === parseInt(req.body.id));

//     if(!employee) {
//         return res.status(400).json({'msg': `Employee ${req.body.id} not found`});
//     }

//     if(req.body.name) {
//         employee.name = req.body.name;
//     }   
//     if(req.body.email) {
//         employee.email = req.body.email;
//     }

//     const filteredEmployees = data.employees.filter(employee => employee.id !== parseInt(req.body.id));
//     const unsortedEmployees = [...filteredEmployees,employee];

//     data.setEmployees(unsortedEmployees.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

//     res.json(data.employees);
// }

// const deleteEmployee = (req,res) => {
//     const employee = data.employees.find(employee => employee.id === parseInt(req.body.id));

//     if(!employee) {
//         return res.status(400).json({'msg': `Employee ${req.body.id} not found`});
//     }

//     const filteredEmployees = data.employees.filter(employee => employee.id !== parseInt(req.body.id));
//     data.setEmployees([...filteredEmployees]);

//     res.json(data.employees);
// }

// const getEmployeeById = (req,res) => {
//     const employee = data.employees.find(employee => employee.id === parseInt(req.params.id));

//     if(!employee) {
//         return res.status(400).json({'msg': `Employee ${req.params.id} not found`});
//     }

//     res.json(employee);
// }

// module.exports = {
//     getAllEmployees,
//     createNewEmployee,
//     updateEmployee,
//     deleteEmployee,
//     getEmployeeById
// }