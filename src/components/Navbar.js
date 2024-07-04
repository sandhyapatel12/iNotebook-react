import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);      //set false toggle button

  return (
   <>
   <nav className='bg-slate-900'>

        <div className='flex justify-between items-center max-w-7xl px-5 md:px-10 py-3 text-gray-300 mx-auto'>

            <h1 className='font-semibold text-xl'> i<span className='text-2xl'>NOTEBOOK</span></h1>

            <div className='hidden md:flex md:space-x-8 '>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>

            {/* if toggle button is open */}
            <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
               {isOpen ? (

                <div className="fixed z-10 lg:hidden inset-0 bg-slate-900 ">

                    <div className="nav-bar flex justify-between  mx-auto p-4 items-center">
                        <h1 className='font-semibold text-xl'> i<span className='text-2xl'>NOTEBOOK</span></h1>
                        <i className="fa-solid fa-square-xmark text-2xl"></i>    {/* close icon */}
                    </div>

                    <div className='py-8 px-10 flex flex-col space-y-5 '>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                    </div>

                </div> 
                ):

                <i className="fa-solid fa-bars text-xl text-white"></i>
                }

            </button>
        </div>  
   </nav>
   </>
  );
};

export default Navbar;
