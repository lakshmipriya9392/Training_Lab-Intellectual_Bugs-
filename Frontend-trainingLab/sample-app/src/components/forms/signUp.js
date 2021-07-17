import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../navbar/navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { emailsender } from '../redux/form/formAction'
import { nameDisplay } from '../redux/form/formAction'

function SignUp() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [user, setUser] = useState({})
    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState({})
    const [email, setEmail] = useState("")
    const [emailErr, setEmailErr] = useState({})
    const [password, setPassword] = useState("")
    const [passwordErr, setPasswordErr] = useState({})
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordErr, setConfirmPasswordErr] = useState({})
    const [loginSuccess, setLoginSuccess] = useState(false)
    var emailValidator = require('email-validator')
    var passwordValidator = require('password-validator')
    var crypto = require('crypto');

    const SubmitForm = (e) => {
        e.preventDefault()
        const isValid = validation()
        if (isValid) {
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")

            const url = 'https://localhost:5001/user/signup'
            var hash = crypto.createHash('md5').update(password).digest('hex');
            const details = {
                name: name,
                emailId: email,
                password: hash
            }
            //Sending part
            axios.post(url, details).then(res => {
                console.log(res)
                setUser(res)
                if (res.data.result !== null) {
                    if (res.data.result === "False") {
                        setLoginSuccess(res.data.message)
                        setLoginSuccess(res.data.message)
                    } else {
                        history.push("/selection")
                        //Dispatch part 
                        dispatch(nameDisplay(name))
                        dispatch(emailsender(email))
                    }

                }
            })
                .catch(err => {
                    console.log(err)
                })

        }
    }

    const validation = () => {

        const schema = new passwordValidator()
        const lengthOfPassword = schema.is().min(8)
        const digitChecker = schema.has().digits(1)

        const nameError = {}
        const emailError = {}
        const passwordError = {}
        const confirmPasswordError = {}
        let valid = true
        if (name.length < 2) {
            nameError.Error = "Name is too short"
            valid = false
        }
        if (!emailValidator.validate(email)) {
            emailError.Error = "Please enter a valid email"
            valid = false
        }

        if (!lengthOfPassword.validate(password)) {
            passwordError.Error = 'Password length is too short'
            valid = false
        }

        if (!digitChecker.validate(password)) {
            passwordError.Error = 'Password must contain atleast one number'
            valid = false
        }
        if (password !== confirmPassword) {
            confirmPasswordError.Error = 'Both password and confirm password are not equal'
            valid = false
        }
        setNameErr(nameError)
        setEmailErr(emailError)
        setPasswordErr(passwordError)
        setConfirmPasswordErr(confirmPasswordError)
        return valid

    }
    const Clear = () => {
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }
    return (
        <>
            <Navbar user={user} />
            <div className="flex justify-center">
                <form onSubmit={SubmitForm} className="text-sm shadow-2xl w-11/12 md:w-5/12 h-auto mt-16 mb-2 pb-5 rounded-2xl border-4 flex justify-center flex-col items-center">
                    <div className="text-2xl my-5">Sign Up</div>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="" id="" className="my-4 w-3/4 outline-none border-b-2" placeholder="Name" />
                    {Object.keys(nameErr).map((key, index) => {
                        return <div key={index} className='text-red-600 text-center'>{nameErr[key]}</div>
                    })}
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="" id="" className="my-4 w-3/4 outline-none border-b-2" placeholder="Your e-mail ex: name@example.com" />
                    {Object.keys(emailErr).map((key, index) => {
                        return <div key={index} className='text-red-600 text-center'>{emailErr[key]}</div>
                    })}
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="" id="" className="my-4 w-3/4 outline-none border-b-2" placeholder="Password" />
                    {Object.keys(passwordErr).map((key, index) => {
                        return <div key={index} className='text-red-600 text-center'>{passwordErr[key]}</div>
                    })}
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="" id="" className="my-4 w-3/4 outline-none border-b-2" placeholder="Confirm Password" />
                    {Object.keys(confirmPasswordErr).map((key, index) => {
                        return <div key={index} className='text-red-600 text-center'>{confirmPasswordErr[key]}</div>
                    })}
                    <div className="flex justify-between w-full px-16 pt-6 pb-4">
                        <button type="button" className="text-xs md:text-sm border-2 border-black outline-none px-2 py-1 rounded-lg"
                            onClick={Clear}
                        >Clear All</button>
                        <button type="submit" className="text-xs md:text-sm border-2 border-black outline-none px-2 py-1 rounded-lg"
                        >Submit</button>
                    </div>
                    <div className="text-center">Already have an account ? <span className='text-blue-500 cursor-pointer' onClick={() => history.push('/signin')}> Sign In </span></div>
                    {loginSuccess !== "" ?
                        <p className='text-red-500 my-2'>{loginSuccess}</p> : ""
                    }
                </form>
            </div>
        </>
    )
}

export default SignUp

// const passwordValidator = require('password-validator')
// const schema = new passwordValidator()
// schema.is().min(8)
// console.log(schema.validate('gdsdsgdfg346232'))

// var validator = require("email-validator");

// validator.validate("test@email.com");
