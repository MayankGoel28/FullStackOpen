import React from 'react'
import '../index.css'
const ErrorNotif = (props) => {
    console.log('error ho raha bro')
    if (props.err == null) {
        return null
    }
    setTimeout(() => {
        props.setErr(null)
    }, 1000)
    return (
        < div className='error'>
            <p>{props.err}</p>
        </div >
    )
}

export default ErrorNotif