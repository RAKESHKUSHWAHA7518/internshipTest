 


const Employee = require('../models/employeeModel');
const{ uploadoncloudinary}= require('../config/cloudnary')


 
async function editEmployee(req, res) {
    try {
      const { id } = req.params;
      let updatedData = req.body;

      console.log("req",req.body);
      

     

   

    if (req.file) {
        const  localFilePath =req.file.path
    const avatar=  await  uploadoncloudinary(localFilePath)
        updatedData.image = avatar.url;  
      }
  
      console.log("image",updatedData.image);
      
      console.log(updatedData);
      
      
      const employee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
      console.log(employee);
      
  
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee updated successfully', employee });
    } catch (error) {
        console.log(error.message);
        
      res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
  }
  

module.exports = editEmployee;
