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
