const Employee = require('../models/employeeModel');
   async function toggleActiveStatus  (req, res)  {
    try {
      const { id } = req.params;
      const employee = await Employee.findById(id);
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      employee.isActive = !employee.isActive;
      await employee.save();
  
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = toggleActiveStatus