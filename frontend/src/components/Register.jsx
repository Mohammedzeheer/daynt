import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosAdmin } from "../api/axiosInstance";


export default function Register() {
  const [user, setUser] = useState({})
  const [errors, setErrors] = useState()
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosAdmin.post('register', user);
      Navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };


  return (
    <section className="h-screen flex justify-center">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone image"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <div className="my-3 text-2xl font-mono font-bold text-blue-700">Register Here</div>

            <form className="mt-6">

              <div className="mb-2">
                <label
                  for="username"
                  className="block text-sm font-semibold text-gray-800"
                >
                  User Name
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="username"
                  name="username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              {errors && (
                <p className="text-red-500 text-xs mt-1">UserName cannot be empty</p>
              )}

              <div className="mb-2">
                <label
                  for="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>


              <div className="mt-6">
                <button
                  onClick={handleRegister}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Sign Up
                </button>
              </div>


              <p className="mt-2 text-xs text-gray-600">
                Have an account?
                <span
                  onClick={() => Navigate("/")}
                  className="text-sm cursor-pointer ml-1
                             no-underline text-blue-600"> Login
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}