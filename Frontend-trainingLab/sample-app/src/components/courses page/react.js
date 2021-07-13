import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Navbar from '../navbar/navbar'
import { motion } from 'framer-motion'
import NavIcon from './../navbar icons/navbarIcon'
import Accordion from './Course components/Accordion'
import Play from './../../assets/play-button.png'
import Footer from './../footer/footer'
import axios from 'axios'
import './../../App.css'
import { useSelector } from 'react-redux'

const ReactPage = () => {
    const state = useSelector(state => state.change2)
    const [nav, openNav] = useState(false)
    const changer = () => {
        if (nav) {
            openNav(false)
        }
        if (!nav) {
            openNav(true)
        }
    }

    const url = "https://localhost:5001/";
    // const [num, setNum] = useState(1)

    const getReact = () => {
        axios.get(`${url}course?id=${state}`)
            .then((response) => {
                const allReact = response.data;
                console.log(allReact)
                // console.log(allReact[0].topics[1].topicName)
                setReactCourses(allReact);
            }).catch(error => console.log(`Error : ${error}`))
    }


    useEffect(() => {
        getReact()
    }, []);

    const [reactCourses, setReactCourses] = useState([]);

    const [video, setVideo] = useState('')

    const [notes, setNotes] = useState(`
    This is a dummy text.The video notes will appear here. This is a dummy text.The video notes will appear here.
    This is a dummy text.The video notes will appear here. This is a dummy text.The video notes will appear here.
    This is a dummy text.The video notes will appear here. This is a dummy text.The video notes will appear here.
    This is a dummy text.The video notes will appear here. This is a dummy text.The video notes will appear here.
    This is a dummy text.The video notes will appear here. This is a dummy text.The video notes will appear here.
    This is a dummy text.The video notes will appear here. This is a dummy text.The video notes will appear here.
    This is a dummy text.The video notes will appear here. This is a dummy text.The video notes will appear here.
    This is a dummy text.The video notes will appear here. This is a dummy text.The video notes will appear here.
    `)

    return (

        <div>

            <Navbar>
                <NavIcon colorA="text-black" colorSecA='text-black font-semibold' />
            </Navbar>
            {/* <button onClick={() => setNum(3)}>Change course</button> */}

            <div className="flex md:justify-between justify-center flex-col md:flex-row bg-no-repeat bg-cover mt-0 md:mt-24 md:mx-10 mx-0 mb-10" >

                <motion.div
                    initial={{ width: 0, height: "100%" }}
                    animate={{ width: nav ? "64%" : 0, height: "100%" }}
                    transition={{ type: 'tween', duration: 0.15 }}
                    className="flex flex-col md:hidden fixed top-0 right-0 bg-blue-600 z-40 w-0 h-0 overflow-hidden">

                    <motion.div
                        initial={{ marginTop: '100vh', opacity: 0 }}
                        animate={nav ? { marginTop: 0, opacity: 1 } : { marginTop: '100rem', opacity: 0 }}
                        transition={{ duration: 0.8 }}

                        className="flex flex-col justify-center" >
                        <div className="my-5 text-white text-2xl text-center">Hello, Pancham</div>
                        {
                            reactCourses.map((prop, headIndex) => {
                                return (
                                    <Accordion key={headIndex} heading={prop.chapterName}>
                                        {prop.topics.map((Topic, childIndex) => {
                                            return (
                                                <motion.p
                                                    whileTap={{ fontWeight: "bold" }}
                                                    key={childIndex} className="w-full font-medium m-2"
                                                    onClick={() => setVideo(Topic.videoURL)}>
                                                    {Topic.topicName}
                                                </motion.p>
                                            )
                                        })}
                                    </Accordion>
                                )
                            })}
                    </motion.div>

                </motion.div>

                <div className="md:hidden flex bg-white w-32 my-5 mx-5 border-4 p-3 rounded-xl text-2xl cursor-pointer z-30"
                    onClick={changer}>☰ Menu</div>

                <div className="flex justify-center items-center flex-col mx-10 w-10/12">

                    <div className=" w-full md:mx-auto mx-10 h-full z-10 flex justify-center border-2">

                        <video src={video} width="100%" height="100%" controls></video>

                    </div>
                    <div className="mt-10 w-auto">
                        <div className="text-3xl font-semibold my-2">About</div>
                        <div className="font-normal" >
                            {notes}
                        </div>

                    </div>

                </div>

                <div className="border-4 rounded-xl py-10 px-5 w-5/12 h-auto border-gray-400 hidden md:block" >
                    {
                        reactCourses.map((prop, headIndex) => {
                            return (
                                <Accordion key={headIndex} heading={prop.chapterName}>
                                    {prop.topics.map((Topic, childIndex) => {
                                        const Setter = () => {
                                            setVideo(Topic.videoURL)
                                            setNotes(Topic.notesURL)
                                        }

                                        return (
                                            <motion.p
                                                whileTap={{ fontWeight: "bold" }}
                                                key={childIndex} className="w-full font-medium
                                             m-2 cursor-pointer" onClick={Setter}>
                                                {Topic.topicName}
                                            </motion.p>
                                        )
                                    })}
                                </Accordion>
                            )
                        })}
                </div>

            </div>
            <Footer />
        </div >
    )
}
export default ReactPage


