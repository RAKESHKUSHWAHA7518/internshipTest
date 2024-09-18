const Employee = require('../models/employeeModel');
   async function deleteEmployee (req, res)  {
    try {
      const { id } = req.params;
      console.log(id);
      
  
      const employee = await Employee.findByIdAndDelete(id);
      console.log(employee);
      
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = deleteEmployee
  