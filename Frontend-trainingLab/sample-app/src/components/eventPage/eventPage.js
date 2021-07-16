import React, { useState, useEffect } from 'react'
import './../../App.css'
import Navbar from '../Navbar/navbar'
import NavIcon from '../navbarIcons/navbarIcon'
import Accordion from './../coursesPage/courseComponents/Accordion'
import Button from './eventButton'
import Footer from '../Footer/footer'
import axios from 'axios'
import EventIcon from '@material-ui/icons/Event';
import ShareIcon from '@material-ui/icons/Share';
import ReadMoreReact from 'read-more-react';
import { useSelector } from 'react-redux'



function EventPage() {
    const state = useSelector(state => state.emailIdReducer)
    const url = "https://localhost:5001/";
    const [events, setEvents] = useState([])
    const [futureEvents, setFutureEvents] = useState([])
    const [pastEvent, futureEvent] = useState(true);
    const [id, setId] = useState()

    const getEvents = () => {
        axios.get(`${url}event`)
            .then((response) => {
                const allEvents = response.data;
                setEvents(allEvents);
            }).catch(error => console.log(`Error : ${error}`))
    }

    const getFutureEvents = () => {
        axios.get(`${url}event/FutureEvents`)
            .then((response) => {
                const allEvents = response.data;
                setFutureEvents(allEvents);
            }).catch(error => console.log(`Error : ${error}`))
    }


    const details = {
        emailId: state,
        eventId: id
    }

    const sendBookingData = () => {
        axios.post("https://localhost:5001/event/addattendee", details)
            .then((res) => {
                console.log(res)
            }).catch((err) => {

            })
    }
    useEffect(() => {
        if (pastEvent) {
            if (events.length === 0) {
                getEvents();
                console.log('Namaste');

            }
        } else {
            if (futureEvents.length === 0)
                getFutureEvents();
        }
        sendBookingData()
    }, [pastEvent, events, futureEvents, id]);




    return (
        <div>
            <Navbar >
                <NavIcon colorC="text-black" colorSecC='border-indigo-500 text-gray-800 bg-gray-50' />
            </Navbar>
            <div className="sticky top-0 left-0 right-0 bg-blue-400 flex text-center text-xl text-white">
                <div
                    // animate={pastEvent ? { backgroundColor: "white", color: "black", fontWeight: "500" } : {}}
                    className={`w-1/2 py-2 cursor-pointer ${pastEvent ? "bg-white text-black font-medium rounded-tr-lg" : ""}`}
                    onClick={() => futureEvent(true)}>Past Events</div>
                <div
                    // animate={pastEvent ? {} : { backgroundColor: "white", color: "black", fontWeight: "500" }}
                    className={`w-1/2 py-2 cursor-pointer ${pastEvent ? "" : "bg-white text-black font-medium rounded-tl-lg"}`}
                    onClick={() => futureEvent(false)}>Future Events</div>
            </div>
            <div className='flex justify-center mt-10 w-full text-base flex-wrap'>

                {(pastEvent) ?
                    events.map((props) => {
                        const Booking = () => {
                            alert("Your ticket is booked")
                            //sending part goes here
                        }
                        // const content = () => {
                        //     return (<p>{props.description}</p>)
                        // }
                        const Sharer = () => {
                            alert("Share this event using the link 👉 http://localhost:3000/events")
                        }
                        return (
                            <div key={props.eventId} className="w-96 rounded-md border-2 h-full relative m-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between m-2">
                                        <div className="mx-2 flex flex-col"><span>{props.eventName}</span>
                                            <div className="text-sm flex flex-col">
                                                <span className='my-2'><EventIcon style={{ width: "1.5rem", height: "1.5rem" }} /> {props.startTime}</span>
                                            </div>
                                        </div>
                                        <div className="font-extrabold cursor-pointer text-2xl text-gray-400 mx-2">
                                            <ShareIcon style={{ color: "black", width: "1.35rem", height: "1.35rem" }} onClick={Sharer} />
                                        </div>
                                    </div>

                                    <iframe src={props.eventURL} frameBorder="0" className='w-full h-48' allowFullScreen></iframe>

                                    <div className="m-2 text-gray-500 cursor-pointer">
                                        <ReadMoreReact
                                            text={props.description}
                                            readMoreText={"...read more"}
                                        />
                                    </div>
                                </div>
                                <div className=" mt-5 mb-5 text-gray-500 mx-5 flex justify-between">
                                    <div className="my-auto">Participants : {props.attendee}</div>

                                    <Accordion heading="Panelists">
                                        {props.attendeeModel.panelists.map((prom, num) => {
                                            return (
                                                <div key={num} className="py-1 px-2">{prom}</div>
                                            )
                                        })}
                                    </Accordion>

                                </div>
                            </div>
                        )
                    })

                    :

                    futureEvents.map((props) => {
                        let add = 0

                        // console.log((Date.now(props.startTime) / (1000 * 60 * 60 * 24 * 12)).toFixed(0))
                        const Booking = () => {
                            // alert("Do you want to attend this event ?")
                            setId(props.eventId)

                            // sendBookingData()

                            //sending part goes here

                        }
                        const Sharer = () => {
                            alert("Share this event using the link 👉 http://localhost:3000/events")
                        }

                        return (
                            <div key={props.eventId} className="w-96 rounded-md border-2 h-full relative m-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between m-2 relative">
                                        <div className="mx-2 flex flex-col"><span>{props.eventName}</span>
                                            <div className="text-sm flex flex-col">
                                                <span className='my-2'><EventIcon style={{ width: "1.5rem", height: "1.5rem" }} /> {props.startTime}</span>
                                                <span className='ml-7 mb-1'>Duration: {(((Date.parse(props.endTime)) - (Date.parse(props.startTime))) / (1000 * 60 * 60)).toFixed(0)} hr</span>
                                            </div>
                                        </div>
                                        <div className="font-extrabold cursor-pointer text-2xl text-gray-500 mx-2" >
                                            <ShareIcon style={{ color: "black", width: "1.35rem", height: "1.35rem" }} onClick={Sharer} />
                                        </div>
                                    </div>

                                    <img src={props.imageURL} alt="" className='w-full h-48' />

                                    <div className="m-2 text-gray-500 cursor-pointer">
                                        <ReadMoreReact
                                            text={props.description}
                                            readMoreText={"...read more "}
                                        />
                                    </div>
                                </div>
                                <div className=" mt-5 mb-2 text-gray-500 mx-5 flex justify-between">
                                    <div className="my-auto">Participants : {props.attendee + add}</div>


                                    <Accordion heading="Panelists">
                                        {props.attendeeModel.panelists.map((prom, num) => {
                                            return (
                                                <div key={num} className="py-1 px-2">{prom}</div>
                                            )
                                        })}
                                    </Accordion>

                                </div>
                                <Button eventClick={Booking} />
                            </div>
                        )
                    })

                }







            </div>
            <Footer />
        </div >)
}

export default EventPage

