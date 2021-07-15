import React from 'react'

function navbar(props) {
    return (
        <>
            <div className="sticky top-0
     left-0 right-0 text-center py-3 
      text-white flex justify-between md:px-20 px-8 z-40 shadow-md bg-blue-500">

                <div className="flex my-auto">
                    <span className="my-auto lg:text-3xl text-2xl md:text-xl mx-5">Training lab</span>
                </div>

                <span className="flex w-auto md:w-3/4">{props.children}</span>
            </div>
        </>
    )
}

export default navbar
