<<<<<<< HEAD
import { useState, useEffect } from 'react'
// import { userService } from '../services/user.service'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
=======
<<<<<<< HEAD
=======
// import { useState, useEffect } from 'react'
// // import { userService } from '../services/user.service'
// import { useSelector, useDispatch } from 'react-redux'

>>>>>>> 7ba2a02f419b69fae88e7b4a3f485a37d20d8f50

export function LoginSignup() {
    const location = useLocation()
    // const params = useParams()
    console.log('location.pathname:',location.pathname)
    // console.log('params:',params)

<<<<<<< HEAD
    
    
    const dispatch = useDispatch()
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullname: '',
    })
 


    return <div className='login-page'></div>
}
=======
 


    return (
        <div className="login-page">

        </div>
    )
}
>>>>>>> c4d44f643eb1d38677a92d501b95842e01c13ae8
>>>>>>> 7ba2a02f419b69fae88e7b4a3f485a37d20d8f50
