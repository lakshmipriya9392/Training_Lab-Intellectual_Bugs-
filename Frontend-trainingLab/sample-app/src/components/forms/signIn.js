import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import './../../App.css'
import Navbar from '../navbar/navbar'
import { useDispatch } from 'react-redux'
import { emailsender } from '../redux/form/formAction'
import { nameDisplay } from '../redux/form/formAction'
function SignIn() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailErr, setEmailErr] = useState({})
    const [passwordErr, setPasswordErr] = useState({})
    const [loginSuccess, setLoginSuccess] = useState(true)
    var emailValidator = require('email-validator')
    var passwordValidator = require('password-validator')
    var crypto = require('crypto')

    const SubmitForm = (e) => {
        e.preventDefault()
        const isValid = validation()
        if (isValid) {
            setEmail("")
            setPassword("")

            var hash = crypto.createHash('md5').update(password).digest('hex');
            const data = {
                emailId: email,
                password: hash
            }
            //Sending part
            axios.post('https://localhost:5001/user/login',
                data
            )
                .then(res => {
                    console.log(res)
                    if (res.data.result !== null) {
                        if (res.data.result === "False") {
                            setLoginSuccess(res.data.message)
                            setLoginSuccess(res.data.message)
                        } else {
                            history.push("/selection")
                            //Dispatch part 
                            dispatch(nameDisplay(res.data.name))
                            dispatch(emailsender(email))
                        }

                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    const validation = () => {
        const schema = new passwordValidator()
        const digitChecker = schema.has().digits(1)
        const emailError = {}
        const passwordError = {}
        let valid = true
        if (!emailValidator.validate(email)) {
            emailError.Error = "Please enter a valid email"
            valid = false
        }

        if (!digitChecker.validate(password)) {
            passwordError.Error = 'Password must contain atleast one number'
            valid = false
        }

        setEmailErr(emailError)
        setPasswordErr(passwordError)
        return valid
    }
    const Clear = () => {
        setEmail("")
        setPassword("")
    }
    return (
        <>
            <Navbar />
            <div className="flex justify-center">
                <form onSubmit={SubmitForm} className="text-sm shadow-2xl w-11/12 md:w-5/12 h-auto mt-16 mb-2 pb-5 rounded-2xl border-4 flex justify-center flex-col items-center">
                    <div className="text-2xl my-5">Sign In</div>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="my-4 w-3/4 outline-none border-b-2" placeholder="Email" />
                    {Object.keys(emailErr).map((key, index) => {
                        return <div key={index} className='text-red-600 text-center'>{emailErr[key]}</div>
                    })}
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="" id="" className="my-4 w-3/4 outline-none border-b-2" placeholder="Password" />
                    {Object.keys(passwordErr).map((key, index) => {
                        return <div key={index} className='text-red-600 text-center'>{passwordErr[key]}</div>
                    })}
                    <div className="flex justify-between w-full px-16 pt-6 pb-4">
                        <button type="button" className="text-xs md:text-sm border-2 border-black outline-none px-2 py-1 rounded-lg"
                            onClick={Clear}
                        >Clear All</button>
                        <button type="submit" className="text-xs md:text-sm border-2 border-black outline-none px-2 py-1 rounded-lg"
                        >Submit</button>
                    </div>

                    <div className="text-center">Didn't have an account ? <span className='text-blue-500 cursor-pointer' onClick={() => history.push('/signup')}> Sign Up </span></div>
                    {loginSuccess !== "" ?
                        <p className='text-red-500 my-2'>{loginSuccess}</p> : ""
                    }
                </form>
            </div>
        </>
    )
}

export default SignIn





