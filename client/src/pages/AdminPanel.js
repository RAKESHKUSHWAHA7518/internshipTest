import React from 'react'

const AdminPanel = () => {
  return (
    <div className='font-bold p-10  text-center'>
      <h1 className='text-4xl'> Welcome to Admin  Dashboard</h1>
    </div>
  )
}

export default AdminPanel




//  import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import 'tailwindcss/tailwind.css';
// import { toast } from 'react-toastify';
// const Employee = () => {
//     const BASE_URL = 'http://localhost:8080/api';
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     designation: '',
//     gender: '',
//     course: [],
//     image: null,
//   });


//   const [errors, setErrors] = useState({});
//   const [employees, setEmployees] = useState([]);
//   const [showForm, setShowForm] = useState(false); // State to toggle form and list

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/employeedata');
//       setEmployees(response.data); // Assuming response data is an array of employees
//       console.log(response.data);
      
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox') {
//       let courses = formData.course;
//       if (checked) {
//         courses = [...courses, value];
//       } else {
//         courses = courses.filter((course) => course !== value);
//       }
//       setFormData({ ...formData, course: courses });
//     } else if (type === 'file') {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.name) newErrors.name = 'Name is required';
//     if (!formData.email.match(/\S+@\S+\.\S+/)) newErrors.email = 'Invalid email';
//     if (!formData.mobile.match(/^[0-9]{10}$/)) newErrors.mobile = 'Invalid mobile number';
//     if (!formData.designation) newErrors.designation = 'Designation is required';
//     if (!formData.gender) newErrors.gender = 'Gender is required';
//     if (formData.course.length === 0) newErrors.course = 'At least one course is required';
//     if (!formData.image) newErrors.image = 'Image is required';
//     else if (!['image/jpeg', 'image/png'].includes(formData.image.type)) {
//       newErrors.image = 'Only jpg/png files are allowed';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formDataToSend = new FormData();
//     for (let key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/employee', {
//         method: 'POST',
//         body: formDataToSend,
//       });
//       const result = await response.json();
//       if (response.ok) {
        
//             toast.success(response.message)
//         // alert('Employee created successfully!');
//         fetchData(); // Refresh the employee list
//         setFormData({
//           name: '',
//           email: '',
//           mobile: '',
//           designation: '',
//           gender: '',
//           course: [],
//           image: null,
//         }); 
//         setShowForm(false);
//         // Reset form data
//       } else {
//         toast.error(result.message)
//         // alert(result.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const handleActivateDeactivate = async (id) => {
//     console.log(id);
    
//     try {
//       const response = await axios.patch(`${BASE_URL}/activate-deactivate/${id}`);
//       fetchData()

//     //   setEmployees((prevEmployees) =>
//     //     prevEmployees.map((employee) =>
//     //       employee._id === id
//     //         ? { ...employee, isActive: response.data.isActive }
//     //         : employee
//     //     )
//     //   );
//     } catch (error) {
//       console.error("Error toggling employee status:", error);
//     }
//   };
  
//   const handleEdit = (id) => {
//     const employeeToEdit = employees.find((employee) => employee.id === id);
//     setFormData(employeeToEdit);
//     setShowForm(true); // Display the form to edit details
//   };
  
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${BASE_URL}/delete/${id}`);
//       fetchData()
//     //   setEmployees((prevEmployees) =>
//     //     prevEmployees.filter((employee) => employee._id !== id)
//     //   );
//     } catch (error) {
//       console.error("Error deleting employee:", error);
//     }
//   };
  
//   const handleUpdate = (id) => {
//     // Add your logic to update the employee data, e.g., sending a request to the server.
//     console.log("Updating employee with ID:", id);
//   };
  

//   return (
//     <div className="  p-2 bg-slate-100  rounded-lg">
//       {showForm ? (
//         <>
//         <div className="flex items-center justify-center p-8 ">
//   <div className="bg-white   rounded-lg p-8 max-w-4xl w-full">
//     <div className="flex justify-between items-center">
//       <h2 className="text-2xl font-semibold mb-4">Create Employee</h2>
//       <button
//         onClick={() => setShowForm(false)}
//         className="text-lg font-semibold text-white mb-4 p-2 bg-red-500 cursor-pointer rounded-lg "
//       >
//         Close Form
//       </button>
//     </div>
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium mb-1">Name:</label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
//         />
//         {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
//         />
//         {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Mobile No:</label>
//         <input
//           type="text"
//           name="mobile"
//           value={formData.mobile}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
//         />
//         {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Designation:</label>
//         <select
//           name="designation"
//           value={formData.designation}
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
//         >
//           <option value="">Select</option>
//           <option value="HR">HR</option>
//           <option value="Manager">Manager</option>
//           <option value="Sales">Sales</option>
//         </select>
//         {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Gender:</label>
//         <div className="flex items-center">
//           <input
//             type="radio"
//             name="gender"
//             value="M"
//             onChange={handleChange}
//             checked={formData.gender === 'M'}
//             className="mr-2"
//           />
//           <label className="mr-4">Male</label>
//           <input
//             type="radio"
//             name="gender"
//             value="F"
//             onChange={handleChange}
//             checked={formData.gender === 'F'}
//             className="mr-2"
//           />
//           <label>Female</label>
//         </div>
//         {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Course:</label>
//         <div className="flex space-x-4">
//           <div>
//             <input
//               type="checkbox"
//               name="course"
//               value="MCA"
//               checked={formData.course.includes('MCA')}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label>MCA</label>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               name="course"
//               value="BCA"
//               checked={formData.course.includes('BCA')}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label>BCA</label>
//           </div>
//           <div>
//             <input
//               type="checkbox"
//               name="course"
//               value="BSC"
//               checked={formData.course.includes('BSC')}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label>BSC</label>
//           </div>
//         </div>
//         {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
//       </div>
//       <div>
//         <label className="block text-sm font-medium mb-1">Image Upload:</label>
//         <input
//           type="file"
//           name="image"
//           onChange={handleChange}
//           className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
//         />
//         {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
//       </div>
//       <button
//         type="submit"
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//       >
//         Submit
//       </button>
//     </form>
//   </div>
// </div>
 
//         </>
        
//       ) : (
//         <div className='w-full'>
//           <h2 className="text-2xl font-semibold mb-4">Employee List</h2>
//           <div className='flex justify-between p-4'>
//            <h1 className='font-semibold '>Count: {employees.length}</h1>
//              <button
//                onClick={() => setShowForm(true)}
//                               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//               Add Employee           </button>
//           </div>

           
// {employees.length > 0 ? (
//   <div className="overflow-x-auto">
//     <table className="min-w-full table-auto">
//       <thead>
//         <tr className="bg-gray-200">
//           <th className="px-4 py-2 text-left">Name</th>
//           <th className="px-4 py-2 text-left">Email</th>
//           <th className="px-4 py-2 text-left">Mobile</th>
//           <th className="px-4 py-2 text-left">Designation</th>
//           <th className="px-4 py-2 text-left">Gender</th>
//           <th className="px-4 py-2 text-left">Courses</th>
//           <th className="px-4 py-2 text-left">Image</th>
//           <th className="px-4 py-2 text-left">Activate/Deactivate</th>
//           <th className="px-4 py-2 text-left">Edit/ Delete</th>
//           {/* <th className="px-4 py-2 text-left"> Update</th> */}



//         </tr>
//       </thead>
//       <tbody>
        
//         {employees.map((employee, index) => (
//   <tr key={index} className="border-b border-gray-300">
//     <td className="px-4 py-2">{employee.name}</td>
//     <td className="px-4 py-2">{employee.email}</td>
//     <td className="px-4 py-2">
//       <img
//         src={employee.image}
//         alt="Preview"
//         className="h-16 w-16 object-cover rounded border border-gray-300"
//       />
//     </td>
//     <td className="px-4 py-2">{employee.mobile}</td>
//     <td className="px-4 py-2">{employee.designation}</td>
//     <td className="px-4 py-2">{employee.gender}</td>
//     <td className="px-4 py-2">{employee.course.join(', ')}</td>
//     <td className="px-4 py-2">
//       <button
//         onClick={() => handleActivateDeactivate(employee._id)}
//         className={`px-4 py-2 rounded ${
//           employee.isActive ? 'bg-green-500' : 'bg-red-500'
//         } text-white`}
//       >
//         {employee.isActive ? 'Deactivate' : 'Activate'}
//       </button>
//     </td>
//     <td className="px-4 py-2">
//       <button
//         onClick={() => handleEdit(employee.id)}
//         className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
//       >
//         Edit
//       </button>
//       <button
//         onClick={() => handleDelete(employee._id)}
//         className="bg-red-500 text-white px-4 py-2 rounded"
//       >
//         Delete
//       </button>
//     </td>
//     {/* <td className="px-4 py-2">
//       <button
//         onClick={() => handleUpdate(employee.id)}
//         className="bg-yellow-500 text-white px-4 py-2 rounded"
//       >
//         Update
//       </button>
//     </td> */}
//   </tr>
// ))}

//       </tbody>
//     </table>
//   </div>
// ) : (
//   <p>No employees found.</p>
// )}

//         </div>
//       )}
//     </div>
//   );
// };

// export default Employee;