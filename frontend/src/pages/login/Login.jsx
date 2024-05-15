import React, {useState} from 'react'
import Navbar from '../../components/Navbar'
import { toast } from 'react-toastify'
import { loginUserApi } from '../../apis/Api'

const Login = () => {

  // make a useState for each input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Make a error state
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  // validation
  const validation = () => {
    let isValid = true;

    if(email.trim() === '' || !email.includes('@')){
      setEmailError("Email is empty or invalid")
      isValid = false;
    }

    if(password.trim() === ''){
      setPasswordError("Password is empty")
      isValid = false;
    }
    return isValid;


  }

  // Make a function to handle the form submission
  const handleLogin = (e) => {
    e.preventDefault()

    // validation
    if(!validation()){
      return
    }

    //  make a json object
    const data = {
      "email" : email,
      "password" : password
    }

    // make a api request (Task)
    loginUserApi(data).then((res) => {
 
      if(res.data.success === false){
        toast.error(res.data.message)
      } else{
        toast.success(res.data.message)

        // success-bool, message-text, token-text, user data - json object
        // Setting token and user data in local storage
        localStorage.setItem('token',res.data.token)

        // setting user data
        const convertedData = JSON.stringify(res.data.userData)

        // local storage set
        localStorage.setItem('user', convertedData)
      }

    })

  }

  return (
    <div className='container'>
        <h1>Login to your Account!</h1>
        <form className='w-50'>
          <label>Email Address : {email}</label>
          <input onChange={(e) => setEmail(e.target.value)} type="text" className='form-control' placeholder='Enter your email address' />

          {
            emailError && <p className='text-danger'>{emailError}</p>
          }

          <label className='mt-2'>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" className='form-control' placeholder='Enter your password' />

          {
            passwordError && <p className='text-danger'>{passwordError}</p>
          }

          <button onClick={handleLogin} className='btn btn-danger w-100 mt-3'>Login</button>
        </form>
    </div>
  )
}

export default Login