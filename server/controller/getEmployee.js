
const Employee = require('../models/employeeModel');
   async function getAllEmployees  (req, res)  {
    try {
      const employees = await Employee.find(); // Fetch all employees from the database
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
  };

  module.exports = getAllEmployees;