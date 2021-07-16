import React from 'react'
import ReadMoreReact from 'read-more-react'
import EventIcon from '@material-ui/icons/Event';
import ShareIcon from '@material-ui/icons/Share';
import Button from './eventButton'

const EventCard = (props) => {
    return (
        <div key={props.eventId} className="w-96 rounded-md border-2 h-full relative m-4 flex flex-col justify-between">
            <div>
                <div className="flex justify-between m-2 relative">
                    <div className="mx-2 flex flex-col"><span>{props.eventName}</span>
                        <div className="text-sm flex flex-col">
                            <span className='my-2'><EventIcon style={{ width: "1.5rem", height: "1.5rem" }} /> {props.startTime}</span>
                            {props.duration}
                        </div>
                    </div>
                    <div className="font-extrabold cursor-pointer text-2xl text-gray-500 mx-2" >
                        <ShareIcon style={{ color: "black", width: "1.35rem", height: "1.35rem" }} onClick={props.sharer} />
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
                <div className="my-auto">Participants : {props.participants}</div>

                {props.children}


            </div>
            {props.button}
        </div>
    )
}

export default EventCard
