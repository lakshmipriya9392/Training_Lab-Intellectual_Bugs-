import React, { useState, useEffect } from 'react'
import './../../App.css'
import Navbar from '../Navbar/navbar'
import NavIcon from '../navbarIcons/navbarIcon'
import Accordion from './../coursesPage/courseComponents/Accordion'
import Button from './eventButton'
import Footer from '../Footer/footer'
import axios from 'axios'
import { useSelector } from 'react-redux'
import EventCard from './eventCard'



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

                    className={`w-1/2 py-2 cursor-pointer ${pastEvent ? "bg-white text-black font-medium rounded-tr-lg" : ""}`}
                    onClick={() => futureEvent(true)}>Past Events</div>
                <div

                    className={`w-1/2 py-2 cursor-pointer ${pastEvent ? "" : "bg-white text-black font-medium rounded-tl-lg"}`}
                    onClick={() => futureEvent(false)}>Future Events</div>
            </div>
            <div className='flex justify-center mt-10 w-full text-base flex-wrap'>

                {(pastEvent) ?

                    events.map((props) => {
                        const sharer = () => {
                            alert("Share this event using the link 👉 http://localhost:3000/events")
                        }
                        return (
                            <EventCard eventId={props.eventId} startTime={props.startTime} imageURL={props.imageURL}
                                description={props.description} participants={props.attendee}
                                sharer={sharer}
                            >
                                <Accordion heading="Panelists">
                                    {props.attendeeModel.panelists.map((prom, num) => {
                                        return (
                                            <div key={num} className="py-1 px-2">{prom}</div>
                                        )
                                    })}
                                </Accordion>
                            </EventCard>
                        )
                    })
                    :
                    futureEvents.map((props) => {
                        let add = 0
                        const booking = () => {
                            setId(props.eventId)
                        }
                        const sharer = () => {
                            alert("Share this event using the link 👉 http://localhost:3000/events")
                        }

                        return (
                            <EventCard eventId={props.eventId} startTime={props.startTime} imageURL={props.imageURL}
                                description={props.description} participants={props.attendee + add}
                                duration={
                                    <span className='ml-7 mb-1'>Duration: {(((Date.parse(props.endTime)) - (Date.parse(props.startTime))) / (1000 * 60 * 60)).toFixed(0)} hr</span>
                                }
                                sharer={sharer} booking={booking} button={<Button eventClick={props.booking} />}
                            >
                                <Accordion heading="Panelists">
                                    {props.attendeeModel.panelists.map((prom, num) => {
                                        return (
                                            <div key={num} className="py-1 px-2">{prom}</div>
                                        )
                                    })}
                                </Accordion>
                            </EventCard>
                        )
                    })
                }




            </div>
            <Footer />
        </div >)
}

export default EventPage

