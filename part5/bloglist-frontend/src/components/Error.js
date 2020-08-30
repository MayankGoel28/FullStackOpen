import React from 'react'
import '../App.css'
const ErrorNotif = (props) => {
    console.log('error ho raha bro')
    if (props.message == null) {
        return null
    }
    setTimeout(() => {
        props.setMessage(null)
    }, 1000)
    return (
        < div className='error'>
            <p>{props.message}</p>
        </div >
    )
}

export default ErrorNotif