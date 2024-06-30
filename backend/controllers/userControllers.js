const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const sendOtp = require('../service/sendOtp');

const createUser = async (req,res) => {
    // 1. Check incomming data
    console.log(req.body);

    // 2. Destructure the incomming data
    const {firstName, lastName, email, password, phone} = req.body;

    // 3. Validate the data (if empty, stop the process and send res)
    if(!firstName || !lastName || !email || !password || !phone){
        // res.send("Please enter all fields!")
        return res.json({
            "success" : false,
            "message" : "Please enter all fields!"
        })
    }

    // 4. Error Handling (Try Catch)
    try {
        // 5. Check if the user is already registered
        const existingUser = await userModel.findOne({email : email })

        // 5.1 if user found: Send response 
        if(existingUser){
            return res.json({
                "success" : false,
                "message" : "User Already Exists!"
            })
        }

        // Hashing/Encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,randomSalt)

        // 5.2 if user is new:
        const newUser = new userModel({
            // Database Fields : Client's Value
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashedPassword,
            phone : phone
        })

        // Save to database
        await newUser.save()

        // send the response
        res.json({
            "success" : true,
            "message" : "User Created Successfully!"
        })

        
    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message" : "Internal Server Error!" 
        })
    }
 

    
}

// Login function
const loginUser =  async (req,res) => {

    // Check incomming data
    console.log(req.body)

    // Destructuring
    const {email, password}  = req.body;

    // Validation
    if(!email || !password){
        return res.json({
            "success" : false,
            "message" : "Please enter all fields!"
        })
    }


    // try catch
    try {

        // find user (email)
        const user = await userModel.findOne({email : email})
        // found data : firstName, lastname, email, password

        // not found (error message)
        if(!user){
            return res.json({
                "success" : false,
                "message" : "User not exists!"
            })
        }

        // Compare password (bcrypt)
        const isValidPassword = await bcrypt.compare(password,user.password)

        // not valid (error)
        if(!isValidPassword){
            return res.json({
                "success" : false,
                "message" : "Password not matched!"
            })
        }

        // token (Generate - user Data + KEY)
        const token = await jwt.sign(
            {id : user._id, isAdmin : user.isAdmin},
            'SECRETKEY'
        )

        // response (token, user data)
        res.json({
            "success" : true,
            "message" : "User Logginned Successul!",
            "token" : token,
            "userData" : user
        })
        
    } catch (error) {
        console.log(error)
        return res.json({
            "success" : false,
            "message" : "Internal Server Error!"
        })
    }
    
}

// Forgot password by using phone number
const forgotPassword = async (req,res) => {
    const {phone} = req.body;

    if(!phone){
        return res.status(400).json({
            'success' : false,
            'message' : 'Provide your phone number!'
        })
    }

    try {

        // finding user
        const user = await userModel.findOne({phone : phone})
        if(!user){
            return res.status(400).json({
                'success' : false,
                'message' : 'User Not Found!'
            })
        }

        // generate random 6 digit otp
        const otp = Math.floor(100000 + Math.random() * 900000)

        // generate expiry date
        const expiryDate = Date.now() + 360000;

        // save to database for verification
        user.resetPasswordOTP = otp;
        user.resetPasswordExpires = expiryDate;
        await user.save();

        // send to registered phone number
        const isSent = await sendOtp(phone, otp)
        if(!isSent){
            return res.status(400).json({
                'success' : false,
                'message' : 'Error Sending OTP Code!'
            })
        }

        // if success
        res.status(200).json({
            'success' : true,
            'message' : 'OTP Send Successfully!'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            'success' : false,
            'message' : 'Server Error!'
        })
    }
}

// Verify otp and set new password
const verifyOtpAndSetPassword = async (req,res) => {

    // get data
    const {phone, otp, newPassword} = req.body;
    if(!phone || !otp || !newPassword){
        return res.status(400).json({
            'success': false,
            'message' : 'Required fields are missing!'
        })
    }

    try {
        const user = await userModel.findOne({phone : phone})

        // Verify otp
        if(user.resetPasswordOTP != otp){
            return res.status(400).json({
                'success': false,
                'message' : 'Invalid OTP!'
            }) 
        }

        if(user.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                'success': false,
                'message' : 'OTP Expired!'
            }) 
        }

        // password hash
        // Hashing/Encryption of the password
        const randomSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword,randomSalt)

        // update to databse
        user.password = hashedPassword;
        await user.save()

        // response
        res.status(200).json({
            'success' : true,
            'message' : 'OTP Verified and Password Updated!'
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            'success': false,
            'message' : 'Server Error!'
        }) 
    }

}


// exporting
module.exports = {
    createUser,
    loginUser,
    forgotPassword,
    verifyOtpAndSetPassword
}




// Improper SPRINT - 1

// Avishek Sah
// Abhay Pratap Sah
// Krishna Shah
// Rajiv Mahat