import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Protection = (props) => {
    const history = useHistory()
    const state = useSelector(state => state.emailIdReducer)
    console.log(state.includes("@"))
    const Comp = props.comp
    useEffect(() => {
        if (!state.length > 3) {
            history.push("/signin")
        }

    }, [])
    return (
        <div>
            <Comp />
        </div>
    )
}

export default Protection

