const Employee = require('../models/employeeModel');
 const{ uploadoncloudinary}= require('../config/cloudnary')


 
async function createEmployee (req, res)  {
  try {
    const { name, email, mobile, designation, gender, course } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

    const localFilePath = req.file.path;
    console.log("Rakesh",localFilePath);

    const avatar=  await  uploadoncloudinary(localFilePath)

    console.log("Rakesh",avatar);
    

    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image:avatar.url,
    });

     const data= await newEmployee.save();
    res.status(201).json({
        data:data,
         message: 'Employee created successfully' });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Failed to create employee', error });
  }
};

module.exports = createEmployee;
