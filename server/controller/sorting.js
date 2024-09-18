// controllers/employee.controller.js

const Employee = require('../models/employee.model');

// GET route to fetch employees with search and sorting
   async function getEmployees (req, res)  {
  try {
    const { search = '', sortBy = 'name', sortOrder = 'asc' } = req.query;

    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    
    // Perform search using a regex pattern
    const searchPattern = new RegExp(search, 'i');
    const employees = await Employee.find({
      $or: [
        { name: searchPattern },
        { email: searchPattern },
      ],
    }).sort(sort);

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees', error });
  }
};

module.exports = getEmployees;