import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AxiosAdmin } from "../api/axiosInstance";

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [analyticsData, setAnalyticsData] = useState('');
  const Navigate = useNavigate()

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (storedToken && storedRefreshToken) {
      setToken(storedToken);
      setRefreshToken(storedRefreshToken);
    }

    const tokenRefreshInterval = setInterval(() => {
      handleTokenRefresh();
    }, 60000);

    return () => {
      clearInterval(tokenRefreshInterval);
    };

  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosAdmin.post('login', {
        username,
        password,
      });
      console.log(`response`,response)
      const { token, refreshToken } = response.data;
      setToken(token);
      setRefreshToken(refreshToken);

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      Navigate('/admin/home')
    } catch (error) {
      toast.error('Login error:', error);
    }
  };

  // const handleFetchAnalytics = async () => {
  //   try {
  //     const response = await AxiosAdmin.get('analytics', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         'Refresh-Token': refreshToken, // Send the refresh token
  //       },
  //     });
  //     setAnalyticsData(response.data.analyticsData);
  //   } catch (error) {
  //     console.error('Fetch analytics error:', error);
  //   }
  // };

  const handleTokenRefresh = async () => {
    try {
      const response = await AxiosAdmin.get('refresh-token', {
        headers: {
          'Refresh-Token': refreshToken, 
        },
      });
      const newToken = response.data.token;
      setToken(newToken);
      localStorage.setItem('token', newToken);
    } catch (error) {
      toast.error('Token refresh error:', error);
    }
  };

  return (
    <>
    {/* <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleFetchAnalytics}>Fetch Analytics</button>
      {analyticsData && <p>{analyticsData}</p>}
      {token && (
        <button onClick={handleTokenRefresh}>
          Refresh Token (Get New Access Token)
        </button>
      )}
    </div> */}


     <section className="h-screen flex justify-center">
      <div className="container h-full px-6 py-24">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Phone image"
            />
          </div>

          <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
            <form className="mt-6">
              <div className="mb-2">
                <label
                  for="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  User Name
                </label>
                <input
        type="text"
        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"             
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
             
              </div>
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        
              </div>

              <div className="mt-6">
                <button
                  onClick={handleLogin}
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                  Login
                </button>
              </div>


              <p className="mt-2 text-xs text-gray-600">
                Don't have an account?
                <span
                  onClick={() => Navigate("/Signup")}
                  className="text-sm cursor-pointer ml-1
                             no-underline text-blue-600"> Sign up
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
     </>
  );
};

export default App;





// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { Axios } from "../api/axiosInstance";


// export default function Login() {
//   const [user, setUser] = useState({})
//   const Navigate = useNavigate()
//   const usertoken = localStorage.getItem('user')
//   useEffect(()=>{
//       if(usertoken){
//           Navigate('/home');  
//       }else{
//           Navigate('/')
//       }
//   })

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await Axios.post('login', user,);
//       localStorage.setItem('user', JSON.stringify(response.data.token));
//       Navigate('/home');
//     } catch (error) {
//       toast.error(error.response.data.message)
//     }
//   };

//   return (
//     <section className="h-screen flex justify-center">
//       <div className="container h-full px-6 py-24">
//         <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
//           <div className="mb-12 md:mb-0 md:w-8/12 lg:w-6/12">
//             <img
//               src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//               className="w-full"
//               alt="Phone image"
//             />
//           </div>

//           <div className="md:w-8/12 lg:ml-6 lg:w-5/12">
//             <form className="mt-6">
//               <div className="mb-2">
//                 <label
//                   for="email"
//                   className="block text-sm font-semibold text-gray-800"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                   placeholder="Email"
//                   name="email"
//                   value={user.email}
//                   onChange={(e) =>
//                     setUser({
//                       ...user,
//                       [e.target.name]: e.target.value,
//                     })
//                   }

//                 />
//               </div>
//               <div className="mb-2">
//                 <label
//                   for="password"
//                   className="block text-sm font-semibold text-gray-800"
//                 >
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
//                   placeholder="Password"
//                   name="password"
//                   value={user.password}
//                   onChange={(e) =>
//                     setUser({
//                       ...user,
//                       [e.target.name]: e.target.value,
//                     })
//                   }
//                 />
//               </div>

//               <div className="mt-6">
//                 <button
//                   onClick={handleLogin}
//                   className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
//                   Login
//                 </button>
//               </div>


//               <p className="mt-2 text-xs text-gray-600">
//                 Don't have an account?
//                 <span
//                   onClick={() => Navigate("/Signup")}
//                   className="text-sm cursor-pointer ml-1
//                              no-underline text-blue-600"> Sign up
//                 </span>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
