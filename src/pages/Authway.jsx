import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import useSignup from '../hooks/useSignup';


const Login = () => {

  const [isLogin,setIsLogin] = useState(true)
  const navigate = useNavigate();
  


  const [inputs,setInputs]  = useState({
    fullname:"",
    username:"",
    password:"",
    confirmpassword:"",
    gender:"",
  })

 const {loading,login} = useLogin()
 const {loadings,signup} = useSignup()
 
	const handleSubmit = async(e) => {
		e.preventDefault();
    if(isLogin){
     await login(inputs);
    }else{
      await signup(inputs)
    }
	}

  const handleisLoginToggle = () => {
    setIsLogin(!isLogin)
  }


  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }


  return (
    <div className='bg-black min-h-screen w-screen flex items-center justify-center p-4'>
      <div 
        className="w-fit mt-20 max-w-sm mx-auto border border-gray-800 bg-black shadow-lg shadow-gray-600/50 rounded-lg p-10 text-white 
          transition duration-500 ease-in-out transform hover:scale-105"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Log in to Ancient Future</h1>
          <p className="text-sm text-gray-400">
            Enter your email and password to access your account
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
        { !isLogin && (<div>
            <label htmlFor="email" className="block text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="uname"
              name='fullname'
              onChange={handleInputChange}
              value={inputs.fullname}
              placeholder="John Doe"
              className="w-full mt-1 p-2 bg-gray-900 text-gray-200 rounded border border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>)}
        
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="uname"
              name='username'
              onChange={handleInputChange}
              value={inputs.username}
              placeholder="Enter your username"
              className="w-full mt-1 p-2 bg-gray-900 text-gray-200 rounded border border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              value={inputs.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 bg-gray-900 text-gray-200 rounded border border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>
         {!isLogin && (<div>
            <label htmlFor="password" className="block text-sm font-medium">
             Confirm Password
            </label>
            <input
              type="password"
              name='confirmpassword'
              id="confirmpassword"
              onChange={handleInputChange}
              value={inputs.confirmpassword}
              placeholder="Enter your password"
              className="w-full mt-1 p-2 bg-gray-900 text-gray-200 rounded border border-gray-700 
                focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>)}
      {!isLogin && (    <div className="mb-3">
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select className="select select-bordered w-full max-w-xs bg-gray-900  border-gray-700" onChange={handleInputChange} name='gender' value={inputs.gender}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>)}
       
                  <div className="text-center">
                  <p className="mb-0">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                      type="button"
                      className="btn btn-link p-0"
                      onClick={handleisLoginToggle}
                    >
                      {isLogin ? 'Sign Up' : 'isLogin'}
                    </button>
                  </p>
                </div>

         {loadings ?( <button
            type="submit"
            className="w-full bg-white text-black py-2 my-10 px-4 rounded hover:bg-gray-400 
              transition duration-200"
          >
            {isLogin ? "Login":"Create Account"}
          </button>):<button
            type="submit"
            className="w-full bg-white text-black py-2 my-10 px-4 rounded hover:bg-gray-400 
              transition duration-200"
      
          >
            {isLogin ? "Login":"Create Account"}
          </button>}
        </form>

      </div>
    </div>
  );
};

export default Login;