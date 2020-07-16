import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
    return(
        <div id='welcome-page'>
            <div id='welcome-create-budget-button'><Link to='/bugdet'>Create a budget</Link></div>
        </div>
    )
}

export default Welcome