import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

function navbarIcon(props) {
    const state = useSelector(state => state.change)
    const [nav, openNav] = useState(false)
    const changer = () => {
        if (nav) {
            openNav(false)
        }
        if (!nav) {
            openNav(true)
        }
    }


    return (

        <div className="flex justify-between w-full">
            <div className=" my-auto text-sm md:flex hidden font-semibold lg:text-lg text-white">
                <Link to='/courses' className={props.colorA}>
                    <p className="p-1 mx-1 cursor-pointer">
                        Courses</p></Link>
                <Link to='/testselection' className={props.colorB}>
                    <p className="p-1 mx-1 cursor-pointer">Test</p></Link>
                <Link to='/events' className={props.colorC}>
                    <p className="p-1 mx-1 cursor-pointer">
                        Events</p></Link>
            </div>
            <div className="md:block hidden">
                <div className="flex my-auto">
                    <div className="my-auto">Hello, {state}</div>
                    <div className="my-auto">
                        <Link to='/'>
                            <div className="scale-150 md:scale-100 text-white  mx-5 md:text-xl text-lg cursor-pointer border-white border-2 py-1 px-2 rounded-lg hover:text-black hover:bg-white duration-200">Logout</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="md:hidden block text-xl my-auto font-black cursor-pointer z-50" onClick={changer}>☰</div>

            <motion.div
                initial={{ width: 0, height: "100%" }}
                animate={{ width: nav ? "64%" : 0, height: "100%" }}
                transition={{ duration: 0.15 }}
                className="flex flex-col md:hidden fixed top-0 right-0 bg-gradient-to-br from-blue-500   to-purple-500  z-20 w-0 h-0 overflow-hidden shadow-2xl text-white">

                <motion.div
                    initial={{ marginTop: '100vh', opacity: 0 }}
                    animate={nav ? { marginTop: 0, opacity: 1 } : { marginTop: '100rem', opacity: 0 }}
                    transition={{ duration: 0.6 }}

                    className="flex flex-col justify-center" >
                    <div className="mt-16 md:text-2xl text-xl pb-3 text-center">Hello, {state}</div>


                    <Link to='/courses' className={props.colorSecA}>
                        <p className="px-2 py-4 mx-1 cursor-pointer  text-xl">Courses</p>
                    </Link>
                    <Link to='/testselection' className={props.colorSecB}>
                        <p className="px-2 py-4 mx-1 cursor-pointer  text-xl">Test</p>
                    </Link>
                    <Link to='/events' className={props.colorSecC}>
                        <p className="px-2 py-4 mx-1 cursor-pointer  text-xl">Events</p>
                    </Link>

                    <Link to='/'>
                        <div className="scale-150 md:scale-100 text-white  mx-5 md:text-xl text-lg cursor-pointer border-white border-2 py-1 px-2 rounded-lg hover:text-black hover:bg-white duration-200">Logout</div>
                    </Link>

                </motion.div>

            </motion.div>
        </div >

    )
}

export default navbarIcon
