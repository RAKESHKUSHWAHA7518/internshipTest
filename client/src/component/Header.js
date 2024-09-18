import React, { useState } from 'react'
import Logo from './Logo'
// import { Link } from 'react-router-dom'

import { GoSearch } from "react-icons/go";
// import { FaUserCircle  } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
const Header = () => {

    const dispatch= useDispatch()

    const navigate =useNavigate()
  
    const user =useSelector(state=>state?.user?.user)
  
    console.log("Rakesh",user);
    

    const handleLogout= async()=>{
        const fetchData = await fetch(SummaryApi.logout_user.url,{
          method: SummaryApi.logout_user.method,
          credentials:'include'
        })
    
        const data = await fetchData.json();
    
        console.log(data);
    
        if(data.success){
          toast.success(data.message)
          navigate('/login')
    
          dispatch(setUserDetails(null))
    
        }
    
        if(data.error){
          toast.error(data.message)
        }
    
       
    
      }
  return (
    <header className='h-16 shadow-md bg-slate-300'>
    <div className='h-full flex items-center px-4  container mx-auto justify-between'>
      <div className=''>
       <Link to={"/"}> <Logo w={90} h={50}/></Link>
      </div>

      <div className=' text-3xl    justify-between max-w-sm items-center    pl-2 focus-within:shadow'>
        <Link to={'/'}>Home</Link>
    </div>

    <div className=' text-3xl    justify-between max-w-sm items-center    pl-2 focus-within:shadow'>
        <Link to={'Admin-dashboard'}>Dashboard</Link>
    </div>


    <div className='flex items-center  gap-6'>

    {user?._id&&(
       
       <Link to={"Employee-List"} > <h1 className=' text-3xl'>Employee-List</h1></Link>
    )
    }

    <div className='text-3xl   relative'>
   <span> {user?.name} </span>
   {/* <div className=' p-1 text-white   w-5  h-5 flex items-center bg-red-500 rounded-full justify-center absolute  -top-2   -right-3'>
     <p className='text-sm' >0</p> 
   </div> */}
    </div>

    {/* <Link to={"login"}> <button className='px-3 py-1 rounded-full bg-rose-500 hover:bg-red-600'> Login</button></Link> */}
     
     <div>

      {
        user?._id?(
          <button onClick={handleLogout} className='px-3 py-1 rounded-full bg-rose-500 hover:bg-red-600'>Logout</button>
        ):(
          // <button className='px-3 py-1 rounded-full bg-rose-500 hover:bg-red-600'>LogIn</button>
          <Link to={"login"}> <button className='px-3 py-1 rounded-full bg-rose-500 hover:bg-red-600'> Login</button></Link>
    
        )
      }
      </div>
    </div>

    </div>
   
  </header>
  )
}

export default Header
