 



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
 

const Employee = () => {
  const BASE_URL = 'http://localhost:8080/api';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);  
  const [editingEmployee, setEditingEmployee] = useState(null);  
  const [sortBy, setSortBy] = useState('');  
  const [sortOrder, setSortOrder] = useState('asc');  
  const [search, setSearch] = useState('');  
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/employeedata`);
      setEmployees(response.data);  
      console.log(response.data);
      
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };



  useEffect(() => {
    filterAndSortEmployees();
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortEmployees();
  }, [search, sortBy, sortOrder,employees]);



  console.log("filteredEmployees",filteredEmployees);
  

  const filterAndSortEmployees = () => {
     
    let filtered = [...employees]; 

    // Search filtering
    if (search) {
      const searchPattern = new RegExp(search, 'i');
      filtered = filtered.filter(
        (employee) =>
          searchPattern.test(employee.name) ||
          searchPattern.test(employee.email)||
          searchPattern.test(employee.createdAt)||
          searchPattern.test(employee.designation)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        // Assuming `date` is a string; if it's a Date object, compare directly
        const dateA = new Date(a[sortBy]);
        const dateB = new Date(b[sortBy]);
        return sortOrder === 'asc'
          ? dateA - dateB
          : dateB - dateA;
      } else {
        if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
    });

    setFilteredEmployees(filtered);
  };

  const handleSort = (field) => {
    // Toggle sort order if sorting by the same field
    setSortBy(field);
    setSortOrder((prevOrder) =>
      prevOrder === 'asc' && field === sortBy ? 'desc' : 'asc'
    );
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      let courses = formData.course;
      if (checked) {
        courses = [...courses, value];
      } else {
        courses = courses.filter((course) => course !== value);
      }
      setFormData({ ...formData, course: courses });
    } else if (type === 'file') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email.match(/\S+@\S+\.\S+/)) newErrors.email = 'Invalid email';
    if (!formData.mobile.match(/^[0-9]{10}$/)) newErrors.mobile = 'Invalid mobile number';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (formData.course.length === 0) newErrors.course = 'At least one course is required';
    if (!formData.image && !editingEmployee) newErrors.image = 'Image is required';
    else if (formData.image && !['image/jpeg', 'image/png'].includes(formData.image.type)) {
      newErrors.image = 'Only jpg/png files are allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
 

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prepare JSON payload instead of FormData
    const formDataToSendEdit = { ...formData };

    const formDataToSend = new FormData();
         for (let key in formData) {
         formDataToSend.append(key, formData[key]);
         }

    try {
        if (editingEmployee) {
            // Update existing employee
            console.log(editingEmployee._id);
            console.log(formDataToSendEdit);

            const   response=   await axios.put(`${BASE_URL}/edit/${editingEmployee._id}`, formDataToSend);
             
            

            // const response = await axios.put(`${BASE_URL}/edit/${editingEmployee._id}`, formDataToSendEdit, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // });
            console.log(response);
            filterAndSortEmployees();
            toast.success('Employee updated successfully!');
        } else {
             
            console.log(formDataToSend);
            await axios.post(`${BASE_URL}/employee`, formDataToSend);
            
            filterAndSortEmployees();
            
            toast.success('Employee created successfully!');

        }

        fetchData(); // Refresh the employee list
        filterAndSortEmployees();

        // Reset form data
        setFormData({
            name: '',
            email: '',
            mobile: '',
            designation: '',
            gender: '',
            course: [],
            image: null,
        });

        setEditingEmployee(null);
        setShowForm(false);
    } catch (error) {
        toast.error('Error submitting form: ' + error.message);
        console.error('Error:', error);
    }
};

  


  const handleActivateDeactivate = async (id) => {
    console.log(id);
    
    try {
   const response=   await axios.patch(`${BASE_URL}/activate-deactivate/${id}`);
   console.log(response);
   filterAndSortEmployees();
      fetchData();
    } catch (error) {
      console.error('Error toggling employee status:', error);
    }
  };

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((employee) => employee._id === id);
    setFormData({
      name: employeeToEdit.name,
      email: employeeToEdit.email,
      mobile: employeeToEdit.mobile,
      designation: employeeToEdit.designation,
      gender: employeeToEdit.gender,
      course: employeeToEdit.course,
      image: employeeToEdit.image, // Keep the existing image unless uploaded
    });
    setEditingEmployee(employeeToEdit);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${id}`);
      filterAndSortEmployees();
      console.log(filteredEmployees);
      
      fetchData();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const closehandle=()=>{
    setShowForm(false)
    setFormData({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        image: null,
    });


  }


  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-2 bg-slate-100 rounded-lg">
      {showForm ? (
        <div className="flex items-center justify-center p-8">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold mb-4">{editingEmployee ? 'Edit Employee' : 'Create Employee'}</h2>
              <button
                onClick={closehandle}
                className="text-lg font-semibold text-white mb-4 p-2 bg-red-500 cursor-pointer rounded-lg"
              >
                Close Form
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mobile No:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Designation:</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                >
                  <option value="">Select</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
                {errors.designation && <p className="text-red-500 text-sm mt-1">{errors.designation}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender:</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="M"
                    onChange={handleChange}
                    checked={formData.gender === 'M'}
                    className="mr-2"
                  />
                  <label className="mr-4">Male</label>
                  <input
                    type="radio"
                    name="gender"
                    value="F"
                    onChange={handleChange}
                    checked={formData.gender === 'F'}
                    className="mr-2"
                  />
                  <label>Female</label>
                </div>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Course:</label>
                <div className="flex space-x-4">
                  <div>
                    <input
                      type="checkbox"
                      name="course"
                      value="MCA"
                      checked={formData.course.includes('MCA')}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label>MCA</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="course"
                      value="BCA"
                      checked={formData.course.includes('BCA')}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label>BCA</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      name="course"
                      value="B.Tech"
                      checked={formData.course.includes('B.Tech')}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label>B.Tech</label>
                  </div>
                </div>
                {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className='p-6'>
            <div className='flex justify-between p-6 px-200'>
                <h1 className='font-semibold text-3xl'>count:{employees.length }</h1>
         
          
      <div className="mb-4">
  <input
    type="text"
    value={search}
    onChange={handleSearchChange}
    placeholder="Search by name or email"
    className="p-2 border border-gray-300 rounded mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    onClick={() => handleSort('name')}
    className={`mr-2 px-4 py-2 border rounded ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
  >
    Sort by Name {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
  </button>
  <button
    onClick={() => handleSort('email')}
    className={`mr-2 px-4 py-2 border rounded ${sortBy === 'email' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
  >
    Sort by Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
  </button>
  <button
    onClick={() => handleSort('createdAt')}
    className={`mr-2 px-4 py-2 border rounded ${sortBy === 'createdAt' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
  >
    Sort by Date {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
  </button>
  <button
    onClick={() => handleSort('designation')}
    className={`mr-2 px-4 py-2 border rounded ${sortBy === 'designation' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'} hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500`}
  >
    Sort by designation {sortBy === 'designation' && (sortOrder === 'asc' ? '↑' : '↓')}
  </button>

  
</div>
<button
            onClick={() => setShowForm(true)}
            className="bg-green-500 text-white px-4  py-2 rounded-lg mb-4"
          >
            Add Employee
          </button>

          </div>
          
          <table className="min-w-full bg-white rounded-lg">
  <thead>
    <tr className="border-b border-gray-300">
      <th className="px-4 py-2">Name</th>
      <th className="px-4 py-2">Email</th>
      <th className="px-4 py-2">Image</th>
      <th className="px-4 py-2">Date</th>

      <th className="px-4 py-2">Mobile</th>
      <th className="px-4 py-2">Designation</th>
      <th className="px-4 py-2">Gender</th>
      <th className="px-4 py-2">Courses</th>
      <th className="px-4 py-2">Status</th>
      <th className="px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
  {filteredEmployees.length > 0 ? (
  filteredEmployees?.map((employee) => (
    <tr key={employee._id} className="border-b border-gray-300">
      <td className="px-4 py-2">{employee.name}</td>
      <td className="px-4 py-2">{employee.email}</td>
      <td className="px-4 py-2">
        <img
          src={employee.image}
          alt="Preview"
          className="h-16 w-16 object-cover rounded border border-gray-300"
        />
      </td>
      <td className="px-4 py-2">
        {formatDate(employee.createdAt)}
      </td>
      <td className="px-4 py-2">{employee.mobile}</td>
      <td className="px-4 py-2">{employee.designation}</td>
      <td className="px-4 py-2">{employee.gender}</td>
      <td className="px-4 py-2">{employee.course.join(', ')}</td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleActivateDeactivate(employee._id)}
          className={`text-white px-2 py-1 rounded-lg ${employee?.isActive ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {employee?.isActive ? 'Deactivate' : 'Activate'}
        </button>
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleEdit(employee._id)}
          className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(employee._id)}
          className="bg-red-500 text-white px-2 py-1 rounded-lg ml-2"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : (
     employees.map((employee) => (
    <tr key={employee._id} className="border-b border-gray-300">
      <td className="px-4 py-2">{employee.name}</td>
      <td className="px-4 py-2">{employee.email}</td>
      <td className="px-4 py-2">
        <img
          src={employee.image}
          alt="Preview"
          className="h-16 w-16 object-cover rounded border border-gray-300"
        />
      </td>
       
      <td className="px-4 py-2">
{formatDate(employee.createdAt)}
</td>
      <td className="px-4 py-2">{employee.mobile}</td>
      <td className="px-4 py-2">{employee.designation}</td>
      <td className="px-4 py-2">{employee.gender}</td>
      <td className="px-4 py-2">{employee.course.join(', ')}</td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleActivateDeactivate(employee._id)}
          className={`text-white px-2 py-1 rounded-lg ${employee?.isActive ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {employee?.isActive ? 'Deactivate' : 'Activate'}
        </button>
      </td>
      <td className="px-4 py-2">
        <button
          onClick={() => handleEdit(employee._id)}
          className="bg-blue-500 text-white px-2 py-1 rounded-lg mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(employee._id)}
          className="bg-red-500 text-white px-2 py-1 rounded-lg ml-2"
        >
          Delete
        </button>
      </td>
    </tr>
  ))
)}

   
  </tbody>
</table>



        </div>
      )}
    </div>
  );
};

export default Employee;

 

