import React, { useCallback, useEffect, useState } from 'react'
import './../../App.css'
import Navbar from './../navbar/navbar'
import { motion } from 'framer-motion'
import { useHistory } from "react-router-dom"
import NavIcon from './../navbar icons/navbarIcon'
import Footer from './../footer/footer'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { courseNum } from './../redux/NameDisplay'

function CoursesPage() {

    const dispatch = useDispatch()
    const [courses, setCourses] = useState([])

    const getCourses = () => {
        axios.get("https://localhost:5001/course")
            .then((res) => {
                const allData = res.data
                console.log(allData[0].courseName)
                setCourses(allData)
            }).catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {
        getCourses()
    }, [])

    const history = useHistory({});

    return (
        <div className='relative top-0 right-0 left-0 bottom-0 bg-blue-300 '>
            <Navbar>
                <NavIcon colorA="text-black" colorSecA='text-black font-semibold' />
            </Navbar>

            <div className="flex flex-wrap justify-center items-center bg-transparent z-10 p-5">

                {courses.map((data) => {
                    const pusher = () => {
                        history.push(`/courses/1`)
                        dispatch(courseNum(data.courseId))
                    }
                    return (
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            key={data.courseId}
                            className="m-3 bg-white min-w-min w-80 h-60 rounded-2xl cursor-pointer flex flex-col shadow-2xl"
                            onClick={pusher}
                        >
                            <img src={data.imageURL} alt="" className='rounded-t-2xl h-3/5 border-b-2' />
                            <div className=" text-center text-2xl my-5">{data.courseName}</div>
                        </motion.div >
                    )

                })}

            </div>
            <Footer />

        </div>
    )
}

export default CoursesPage
