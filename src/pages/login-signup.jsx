<<<<<<< HEAD
// import { useState, useEffect } from 'react'
// // import { userService } from '../services/user.service'
// import { useSelector, useDispatch } from 'react-redux'


=======
import { useLocation } from "react-router-dom"
>>>>>>> 0de13fd3dc0332a3869e7149b34966cb20ba5db5
export function LoginSignup() {
    const location = useLocation()
    // const params = useParams()
    console.log('location.pathname:',location.pathname)
    return (<div className="login-logout-page flex justify-center">

        <h1>{location.pathname.substring(1)} page</h1>
    </div>
    )
}
