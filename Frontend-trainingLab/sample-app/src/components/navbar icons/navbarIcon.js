import React, { useState } from 'react'
import { Link } from 'react-router-dom'
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
            <div className={`${nav ? "text-black" : "text-white"} md:hidden block text-xl my-auto font-black cursor-pointer z-50`} onClick={changer}>☰</div>

            <div

                className=" md:hidden fixed top-0 right-0 z-20 overflow-hidden shadow-2xl">

                <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800">
                    <div className={`fixed flex flex-col top-0 right-0 ${nav ? "w-64" : "w-0"} bg-white h-full border-r duration-300`}>
                        <div className="overflow-y-auto overflow-x-hidden flex-grow">

                            <ul className="flex flex-col py-4 space-y-1 mt-5">
                                <div className="my-2  py-2 px-8">Welcome,{state}</div>
                                <li className="px-5">
                                    <div className="flex flex-row items-center h-8">
                                        <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                                    </div>
                                </li>
                                <Link to='/courses'>
                                    <div
                                        className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${props.colorSecA}`}>
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2"
                                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                                                </path>
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">Courses</span>
                                    </div>
                                </Link>
                                <Link to='/testselection'>
                                    <div
                                        className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${props.colorSecB}`}>
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2"
                                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4">
                                                </path>
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">Test</span>

                                    </div>
                                </Link>
                                <Link to='/events'>
                                    <div
                                        className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6 ${props.colorSecC}`}>
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLineCap="round" strokeLineJoin="round" strokeWidth="2"
                                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                                                </path>
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">Events</span>
                                    </div>
                                </Link>

                                <li className="px-5">
                                    <div className="flex flex-row items-center h-8">
                                        <div className="text-sm font-light tracking-wide text-gray-500">Settings</div>
                                    </div>
                                </li>
                                <Link to='/'>
                                    <div
                                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                        <span className="inline-flex justify-center items-center ml-4">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                                                </path>
                                            </svg>
                                        </span>
                                        <span className="ml-2 text-sm tracking-wide truncate">Logout</span>
                                    </div>
                                </Link>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div >

    )
}

export default navbarIcon
