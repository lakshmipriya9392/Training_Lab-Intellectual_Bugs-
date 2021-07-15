import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from "axios"
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { testIdSetting } from './../redux/NameDisplay'
import { useDispatch } from 'react-redux'

function TestPage() {
    const dispatch = useDispatch()
    const nameShow = useSelector(state => state.change)
    const statmail = useSelector(state => state.change3)
    const state = useSelector(state => state.change4)
    const stateSec = useSelector(state => state.change5)
    const [arrLen, setArrLen] = useState(0)
    const [data, setData] = useState(
        {
            optionList: [
                { option: "" }
            ]

        }
    )
    const [num, setNum] = useState(0)
    const [answers, setAnswers] = useState('')
    const [correctAns, setCorrectAns] = useState("")
    const [response, setResponse] = useState()
    const getQuestions = () => {
        axios.get(`https://localhost:5001/test?id=${state}&levelName=${stateSec}`)
            .then((res) => {
                const TestData = res.data[num];
                setArrLen(res.data)
                if (TestData === undefined) {
                    setData(
                        {
                            "questionId": 0,
                            "question": "",
                            "optionList": [
                                { option: "" }
                            ],
                            "answer": null,
                            "typeOfQuestion": "",
                            "testId": 0
                        }
                    )
                }
                else {
                    setData(TestData)
                    dispatch(testIdSetting(res.data[num].testId))
                }

            }).catch((err) => { console.log(`Error : ${err}`) })
    }

    const getAnswers = () => {
        axios.post(`https://localhost:5001/test?id=${data.questionId}&emailId=${statmail}&answer=${answers}`)
            .then((res) => {
                setResponse(res.data.message)
                setCorrectAns(res.data.correctAnswer)
            }).catch((err) => {
                console.log(err)
            })
    }

    const cancelTest = () => {
        axios.post(`https://localhost:5001/test/clearScore`)
            .then((res) => {
                history.push('/testselection')
            }).catch((err) => {
                console.log(err)
            })

    }


    const history = useHistory()
    const increaser = () => {
        if (num < (arrLen.length - 1)) {
            setNum(num + 1)
            setResponse("")
            setAnswers("")
        }
    }

    const checker = () => {
        if (answers.length === 0) {
            setResponse("Please choose an option to continue")
        }
        else {
            getAnswers()
        }

    }


    let [min, setMin] = useState(10)
    let [sec, setSec] = useState(0)


    useEffect(() => {
        getQuestions()
    }, [num])


    useEffect(() => {
        const timer = setInterval(() => {
            if (sec > 0) {
                setSec(sec - 1)
            }
            else if (min === 0 && sec === 0) {
                setSec(0)
                setMin(0)
            }
            else if (sec === 0) {
                setSec(59)
                setMin(min - 1)
            }
        }, 1000);
        return () => clearInterval(timer)
    }, [sec])

    return (

        <>
            {arrLen.length > 1 ?
                <div className='relative top-0 left-0 right-0 bottom-0 flex justify-center'>
                    <div className="w-3/4 mt-10 h-auto">
                        <div className="text-center text-xl my-2">Welcome, {nameShow}</div>

                        <div className="w-full">
                            <div className="text-center text-2xl mb-2 mx-5">Question: {num + 1}</div>
                            <div className="w-full box-content border-2 border-black h-auto relative">
                                <div className="w-auto flex justify-between mx-5 flex-wrap lg:justify-end">
                                    <div className="w-10/12 text-center text-xl font-semibold my-4 bg-white order-2 lg:order-1">{data.question}</div>
                                    <div className="w-auto my-3 font-semibold bg-white order-1 lg:order-2">Time left: {min} :{sec < 10 ? 0 : null}{sec} </div>
                                </div>

                                <div className="w-full h-auto flex flex-wrap justify-around">
                                    {data.optionList.map((value, index) => {
                                        return (
                                            <>
                                                <div key={index} className={`border-black bg-blue-500 hover:bg-blue-400 border rounded-md md:w-5/12 w-36 my-4 cursor-pointer text-white duration-200 shadow-2xl relative`}
                                                >
                                                    <motion.div
                                                        initial={{ width: 0, height: 0 }}
                                                        animate={(response === "CORRECT ANSWER!" || response === "WRONG ANSWER!") ? { width: "100%", height: "100%" } : { width: 0, height: 0 }}
                                                        transition={{ type: "tween", duration: 0.001 }}
                                                        className="absolute bg-transparent z-40 overflow-hidden">
                                                    </motion.div>
                                                    <div className=' px-5 py-3 z-20 '
                                                        onClick={() => setAnswers(value.option)}
                                                    >{value.option}</div>
                                                </div>

                                            </>
                                        )
                                    })}
                                </div>
                                <div className={`my-2 mx-12 font-medium text-lg`}>Your answer : <span className={`${response === "CORRECT ANSWER!" ? "text-green-400" : ""} ${response === "WRONG ANSWER!" ? "text-red-400" : ""}`}> {answers}</span></div>
                                <div className={`my-2 mx-12 font-medium text-lg`}>
                                    <span
                                        className={`${response === "CORRECT ANSWER!" ? "text-green-400" : ""}
                                 ${response === "WRONG ANSWER!" ? "text-red-400" : ""}`}>
                                        {response}
                                    </span>
                                    <span className='text-black ml-3 mr-2'>
                                        {response === "WRONG ANSWER!" ? "Correct answer: " : null}
                                    </span>
                                    <span className='text-green-500 mr-3'>
                                        {response === "WRONG ANSWER!" ? correctAns : null}
                                    </span>
                                </div>
                                <div className="flex justify-around my-8">
                                    <div className="md:w-3/12 w-32 mx-5 text-center rounded-lg border-2 p-2 bg-white font-medium border-red-400 hover:border-red-500 hover:bg-red-100 duration-200 text-red-500  cursor-pointer" onClick={() => cancelTest()}>Leave</div>
                                    {(!(min === 0 && sec === 0)) || num === 9 ?
                                        <>
                                            {(response === "CORRECT ANSWER!" || response === "WRONG ANSWER!") ?
                                                <>
                                                    <div className={`md:w-3/12 w-32 mx-5 text-center rounded-lg border-2 p-2 bg-white font-medium ${num === 9 ? "border-gray-400 text-gray-500" : "border-blue-400 hover:border-blue-500 text-blue-500 hover:bg-blue-100"}  duration-200 cursor-pointer`} onClick={increaser} >Next</div>
                                                </>
                                                :
                                                <>
                                                    {
                                                        data.question === "" ?
                                                            null
                                                            :
                                                            <>
                                                                <div className="md:w-3/12 w-32 mx-5 text-center rounded-lg border-2 p-2 bg-white font-medium border-green-400 hover:border-green-500 hover:bg-green-100 duration-200 text-green-500  cursor-pointer" onClick={checker} >Check answer</div>
                                                            </>
                                                    }
                                                </>
                                            }


                                        </> : <h1 className='font-semibold text-center text-xl'>Opps! Time Out</h1>
                                    }

                                </div>
                            </div>
                        </div>

                        {num === (arrLen.length - 1)
                            && (response === "CORRECT ANSWER!" || response === "WRONG ANSWER!")
                            ?
                            <Link to='/test/summary'>
                                <div className="flex justify-center my-4">
                                    <div className="md:w-3/12 w-32 mx-5 text-center rounded-lg border-2 p-2 bg-white font-medium border-green-400 hover:border-green-500 hover:bg-green-100 duration-200 text-green-500  cursor-pointer">View Score</div>
                                </div>
                            </Link>
                            : null}
                    </div>
                </div > : <>
                    <h1 className="text-2xl text-center mt-64">Sorry, we don't have data for this question set</h1>
                    <div className="flex justify-center my-8 mx-2">
                        <Link to='/testselection' className="md:w-3/12 w-32 mx-5 text-center rounded-lg border-2 p-2 bg-white font-medium border-green-400 hover:border-green-500 hover:bg-green-100 duration-200 text-green-500  cursor-pointer">
                            Return to selection page
                        </Link>
                    </div>
                </>
            }
        </>

    )
}

export default TestPage

