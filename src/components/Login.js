import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    //usestate for set object{} email, password
    const [credientials, setCrediential] = useState({email:"", password:""})

    //create useNavigate hook
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault()  //page not reload

        //fetch api
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers:
            {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({ email: credientials.email, password: credientials.password })

        });
        const json = await response.json();
        console.log(json)   //display user notes on screen
        if(json.success)
        {
            localStorage.setItem('token', json.token);      //save auth token into local storage
            navigate('/');       //redirect at home page
        }
        else{
            // props.showAlert('error', 'Invalid username and password....')
            alert('Invalid username or password')
        }
    }

   
    const changeText = (e) =>
        {
             //when text is change(user enter data) then work update state
                setCrediential({...credientials, [e.target.name]: e.target.value})  //... is a spread operator which return a object that alredy added and add into new object
        } 

    return (
        <>
            <div className="flex items-center justify-center mt-40">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Email</label>
                            <input type="email" id='email' name='email' value={credientials.email} onChange={changeText} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required />
                        </div>

                        <div>
                            <label className="block text-gray-700">Password</label>
                            <input type="password" id='password' name='password' value={credientials.password} onChange={changeText} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" required/>
                        </div>
                        
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 ">
                            Login
                        </button>
                    </form>
                </div>
            </div>
    
        </>
    )

}
export default Login
