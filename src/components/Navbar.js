import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);      //set to  false toggle button

  //useLocation hook for active links
  let location = useLocation();

  const getActiveLink = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-white';   //if link is active then  text color is blue
  };

  //useNavigate for redirection
  const navigate = useNavigate();

  //for logout
  const handleLogout = () => {
    localStorage.removeItem('token')  //all tokens remove from db
    props.showAlert('info', 'you are logeed out successfully....')
    navigate('/login')
}

  return (
    <>
      <div className='bg-blue-950 '>
        <div className='max-w-7xl  items-center justify-between flex mx-auto py-4  text-white px-10'>
          <h1 className='font-semibold text-xl'> i<span className='text-2xl'>NOTEBOOK</span></h1>

          <div className='hidden md:flex md:space-x-8 font-bold  items-center '>
            <NavLink to="/" className={getActiveLink('/')}>Add Note</NavLink>
            <NavLink to="/usernotes" className={getActiveLink('/usernotes')}>View Notes</NavLink>


     
          {!localStorage.getItem('token') ? <div className='space-x-5 items-center  flex'>

            <div className='border-2 border-gray-500 px-5 py-2 font-bold rounded-lg'>
              <NavLink to="/login" className={getActiveLink('/login')} >Login</NavLink>
            </div>

            <div className='border-2 border-gray-500 px-5 py-2 font-bold rounded-lg'>
              <NavLink to="/signup" className={getActiveLink('/signup')} >SignUp</NavLink>
            </div>

          </div> :
            <div className='border-2 border-gray-500 px-5 py-2 font-bold rounded-lg'>
              <NavLink to='/logout' onClick={handleLogout} className={getActiveLink('/signup')}>Logout</NavLink>
            </div>
          }
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
                  <NavLink to="/" className={getActiveLink('/')}>Add Note</NavLink>
                  <NavLink to="/about" className={getActiveLink('/usernotes')}>User Notes</NavLink>

                  {!localStorage.getItem('token') ? <div className=' space-y-5 md:space-x-5  flex flex-col'>

<div className='border-2 border-gray-500 px-5 py-2 font-bold rounded-lg'>
  <NavLink to="/login" className={getActiveLink('/login')} >Login</NavLink>
</div>

<div className='border-2 border-gray-500 px-5 py-2 font-bold rounded-lg'>
  <NavLink to="/signup" className={getActiveLink('/signup')} >SignUp</NavLink>
</div>

</div> :
<div className='border-2 border-gray-500 px-5 py-2 font-bold rounded-lg'>
  <NavLink to='/logout' onClick={handleLogout} className={getActiveLink('/signup')}>Logout</NavLink>
</div>
}
                </div>

              </div>
            ) :
              <i className="fa-solid fa-bars text-xl text-white"></i>
            }

          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
