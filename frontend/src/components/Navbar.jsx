import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const Navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    Navigate('/admin');
  };

  useEffect(() => {
    const checkLogin = () => {
      const checkToken = localStorage.getItem("token");
      if (checkToken) {
        setLogin(true);
      }
    };
    checkLogin();
  }, []);


  return (
    <>
      <nav className="bg-customBlue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              onClick={() => Navigate("/admin/home")}
              className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white"
            >Daynt
            </div>


            <div className="hidden md:block flex items-center space-x-4">
              {isLogin && (
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md hover:bg-customBlue text-indigo-600 hover:text-gray-500"
                      onMouseEnter={() => setIsOpen(!isOpen)}
                    >
                      {isLogin && (
                        <span className="text-white mr-1 ">user</span>
                      )}
                      <span className="text-white">
                        <FiChevronDown />
                      </span>
                    </button>
                  </div>
                  {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="block px-4 py-2 font-medium text-sm text-customBlue  hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!isLogin && (
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white  hover:bg-customBlue"
                  onClick={() => Navigate("/admin")}
                >
                  Get Started
                </button>
              )}
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-customBlue focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                {isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`${isOpen ? "block" : "hidden"} md:hidden`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLogin && (
              <>
                <a
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-customBlue w-[85px] hover:text-white block px-3 py-1 rounded-md font-medium no-underline"
                >
                  Logout
                </a>
              </>
            )}
            {!isLogin && (
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white  hover:bg-customBlue"
                onClick={() => Navigate("/admin")}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
