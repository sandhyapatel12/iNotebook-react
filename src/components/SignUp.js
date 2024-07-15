import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

     //usestate for set object{} name, email, password
     const [credientials, setCrediential] = useState({name:"", email:"", password:""})

     //create useNavigate hook for redirection
     const navigate = useNavigate();
 
     const submitHandler = async (e) => {

         e.preventDefault()  //page not reload
 
         //fetch api
         const response = await fetch("http://localhost:5000/api/auth/createuser", 
          {
             method: "POST",
             headers:
             {
                 'Content-Type': 'application/json'
             },
 
             body: JSON.stringify({ name: credientials.name, email: credientials.email, password: credientials.password })
          });
          const json = await response.json();
          console.log(json)   //display user notes on screen

          if(json.success)
          {
              localStorage.setItem('token', json.token);      //save auth token into local storage
              navigate('/');       //redirect at home page
  
          }
          else{
              alert("invalid")
          }
         
        }
 
   
     const changeText = (e) =>
         {
              //when text is change(user enter data) then work update state
                 setCrediential({...credientials, [e.target.name]: e.target.value})  //... is a spread operator which return a object that alredy added and add into new object
         } 

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <form onSubmit={submitHandler} className="space-y-4">

            <div> 
              <label className="block text-gray-700">Name</label>
              <input type="text" id='name' name='name' value={credientials.name} onChange={changeText} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" minLength={5} required />
            </div>

            <div>
              <label className="block text-gray-700">Email</label>
              <input type="email" id='email' name='email' value={credientials.email} onChange={changeText} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
            </div>

            <div>
              <label className="block text-gray-700">Password</label>
              <input type="password" id='password' name='password' value={credientials.password} onChange={changeText} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" minLength={8} required />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors">
              Sign Up
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
