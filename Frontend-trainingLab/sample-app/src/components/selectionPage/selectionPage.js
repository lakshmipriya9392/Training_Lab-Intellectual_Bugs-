import React from 'react'
import TechImage from './../../assets/TechImage.jpeg'
import TestImage from './../../assets/TestImage.png'
import EventImage from './../../assets/EventImage.jpg'
import NavIcon from '../navbarIcons/navbarIcon'
import { motion } from 'framer-motion'
import Navbar from '../Navbar/navbar'
import { Link } from 'react-router-dom'
import Footer from '../Footer/footer'

function SelectionPage() {
    return (
        <div className="relative w-full h-full bg-blue-300">

            {/* <img src={BackImage} alt="" className='absolute top-0 bottom-0 left-0 right-0 w-screen h-screen mx-auto mt-0 z-0' /> */}

            <Navbar>
                <NavIcon />
            </Navbar>

            <div className="md:mt-16 mt-12 w-full text-2xl top-0 bottom-0 flex
             flex-wrap justify-center z-20 py-6">

                <Link to='/courses'>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="m-5 bg-white min-w-min w-96 h-72 rounded-3xl cursor-pointer flex flex-col shadow-2xl">
                        <img src={TechImage} alt="" className='rounded-t-3xl h-3/5' />
                        <div className=" text-center my-5">Courses</div>
                    </motion.div>
                </Link>

                <Link to='/testselection'>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="m-5 bg-white min-w-min w-96 h-72 rounded-3xl cursor-pointer flex flex-col shadow-2xl">
                        <img src={TestImage} alt="" className='rounded-t-3xl h-3/5' />
                        <div className="text-center my-5">Take Test</div>
                    </motion.div>
                </Link>

                <Link to='/events'>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="m-5 bg-white min-w-min w-96 h-72 rounded-3xl cursor-pointer flex flex-col shadow-2xl">
                        <img src={EventImage} alt="" className='rounded-t-3xl h-3/5' />
                        <div className="text-center my-5">Events</div>
                    </motion.div>
                </Link>

            </div>
            <Footer />
        </div>
    )
}

export default SelectionPage
