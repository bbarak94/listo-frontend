import { useState, useEffect } from 'react'
// import { userService } from '../services/user.service'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

export function LoginSignup() {
    const location = useLocation()
    // const params = useParams()
    console.log('location.pathname:',location.pathname)
    // console.log('params:',params)

    
    
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullname: '',
    })
 


    return <div className='login-page'></div>
}
