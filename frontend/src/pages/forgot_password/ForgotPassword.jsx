import React, {useState} from 'react'
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Api'
import { toast } from 'react-toastify'

const ForgotPassword = () => {

  // make a state
  const [phone, setPhone] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // send otp function
  const handleSendOtp = (e) => {
    e.preventDefault()

    // api call
    forgotPasswordApi({phone}).then((res) => {
      if(res.status === 200){
        toast.success(res.data.message)
        setIsSent(true)
      }
    }).catch((error) => {
      if(error.response.status === 400 || 500) {
        toast.error(error.response.data.message)
      }
    })

  }

  // verify otp and set password
  const handleVerifyOtp = (e) => {
    e.preventDefault()

    const data = {
      'phone' : phone,
      'otp' : otp,
      'newPassword' : newPassword
    }

    // api call
    verifyOtpApi(data).then((res) => {
      if(res.status === 200){
        toast.success(res.data.message)
      }
    }).catch((error) => {
      if(error.response.status === 400 || 500) {
        toast.error(error.response.data.message)
      }
    })

  }

  return (
    <>
        <div className='container mt-3'>
            <h3>Forgot Password!</h3>

            <form className='w-25'>
                <span className='d-flex'>
                    <h4>+977</h4>
                    <input disabled={isSent} onChange={(e) => setPhone(e.target.value)} type="number" className='form-control' placeholder='Enter valid phone number' />
                </span>

                <button disabled={isSent} onClick={handleSendOtp} className='btn btn-dark mt-2 w-100'>Send OTP</button>

                {
                  isSent && <>
                      <hr />
                      <p>OTP has been sent to {phone}✅</p>
                      <input onChange={(e) => setOtp(e.target.value)} placeholder='Enter valid OTP Code!' type="number" className='form-control' />
                      <input onChange={(e) => setNewPassword(e.target.value)} type="text" className='form-control mt-2' placeholder='Set New Password!' />

                      <button onClick={handleVerifyOtp} className='btn btn-primary w-100 mt-2'>Verify OTP & Set Password</button>
                  </>
                }

            </form>

        </div>
    </>
  )
}

export default ForgotPassword


// Logic for Forgot Password
// 1. Make a UI DONE
// 2. Make a state
// 3. Send OTP (Make a api call)
// if send otp success:
// Disable the Input, Button
// Show the UI : (OTP Input, Set Password Input)
// Verify otp and set password
// if not verified dont change password
