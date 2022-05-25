<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 5247befa5a86d81e48ff946d574fccb7745ba9bf
// import { useState, useEffect } from 'react'
// // import { userService } from '../services/user.service'
// import { useSelector, useDispatch } from 'react-redux'


=======
=======
>>>>>>> 425cbe24217b61f8894568bcb4f0027e65bde81d
import { useLocation } from "react-router-dom"
export function LoginSignup() {
    const location = useLocation()
    // const params = useParams()
    console.log('location.pathname:',location.pathname)
    return (<div className="login-logout-page flex justify-center">

        <h1>{location.pathname.substring(1)} page</h1>
    </div>
    )
}
