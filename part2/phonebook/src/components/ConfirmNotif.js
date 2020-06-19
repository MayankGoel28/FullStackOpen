import React from 'react'
import '../index.css'
const ConfirmNotif = (props) => {
    console.log('confirm ho raha bro')
    if (props.message == null) {
        return null
    }
    setTimeout(() => {
        props.setMessage(null)
    }, 1000)
    return (

        < div className='confirm'>
            <p>{props.message}</p>
        </div >
    )
}

export default ConfirmNotif