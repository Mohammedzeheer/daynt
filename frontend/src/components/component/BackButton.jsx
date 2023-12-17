import React from 'react'
import { FaBackward } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'  

function BackButton() {
    const Navigate =useNavigate()
    return (
        <div className='mb-5' >
            <button
                type="button"
                onClick={() => Navigate(-1)}
                style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    display: "flex",
                    alignItems: "center",
                }}
                className="p-[10px] py-1 font-semibold rounded-full bg-gray-500 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mt-5"
            >
                <FaBackward style={{ marginRight: "5px" }} /> Go Back
            </button>
        </div>
    )
}

export default BackButton




