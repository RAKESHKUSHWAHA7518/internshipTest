import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: ""
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    

    if (data.password === data.confirmpassword) {
      try {
        const dataResponse = await fetch(SummaryApi.signUP.url, {
          method: SummaryApi.signUP.method,
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const dataApi = await dataResponse.json();
        console.log(dataApi);
        

        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate('/login');
        } else if (dataApi.error) {
          toast.error(dataApi.message);
        }
      } catch (error) {
        toast.error("Error during signup");
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-gray-50 p-2 py-5 w-full max-w-sm mx-auto rounded-lg">
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  className="h-full w-full outline-none bg-transparent"
                  type="text"
                  required
                  placeholder="Enter Name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  className="h-full w-full outline-none bg-transparent"
                  type="email"
                  required
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  className="h-full w-full outline-none bg-transparent"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  className="h-full w-full outline-none bg-transparent"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  placeholder="Confirm Password"
                  name="confirmpassword"
                  value={data.confirmpassword}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
            </div>

            <button className="bg-red-500 text-white w-full px-6 py-2 my-5 max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block">
              SignUp
            </button>
          </form>
          <p className="my-4">
            Already have an account?{" "}
            <Link className="hover:text-blue-400" to={'/login'}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
