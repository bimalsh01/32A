import React from 'react'

const ForgotPassword = () => {
  return (
    <>
        <div className='container mt-3'>
            <h3>Forgot Password!</h3>

            <form className='w-25'>
                <span className='d-flex'>
                    <h4>+977</h4>
                    <input type="number" className='form-control' placeholder='Enter valid phone number' />

                    

                </span>

                <button className='btn btn-dark mt-2 w-100'>Send OTP</button>
            </form>

        </div>
    </>
  )
}

export default ForgotPassword
