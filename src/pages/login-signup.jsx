import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import GoogleLogin from 'react-google-login'
import { gapi } from 'gapi-script'

import OutlinedInput from '@mui/material/OutlinedInput'
import AppleIcon from '@mui/icons-material/Apple'
import Button from '@mui/material/Button'

import logoSvg from '../assets/img/listo.svg'
import leftImg from '../assets/img/login-signup/left.svg'
import rightImg from '../assets/img/login-signup/right.svg'
import microsoft from '../assets/img/login-signup/microsoft.png'
import google from '../assets/img/login-signup/google.png'

import { login, signup } from '../store/actions/user.action'
import { getPanelId } from '@mui/base'

export function LoginSignup() {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')


    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: "email",
                plugin_name: "chat"
            })
        }
    }, [])

    const onLogin = async (ev = null) => {
        const credentials = { username, password }
        const res = await dispatch(login(credentials))
        if (res) navigation('/workspace')
        else setMsg('can\'t login, try again')
    }

    function handelLogin(res) {
        console.log(res)
    }

    function handelFailure(res) {
        console.log(res)
    }

    const onSignup = (ev = null) => {
        const credentials = { username, fullname, password, imgUrl: 'https://res.cloudinary.com/bbarak94/image/upload/v1653409951/guest_he90su.jpg' }
        const res = dispatch(signup(credentials))
        if (res) navigation('/workspace')
    }

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        switch (field) {
            case 'fullname':
                setFullname(value)
                break
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
                break
        }
    }

    return (
        <div className='login-signup flex justify-center'>
            <div className='login-logo-container'>
                <img className='login-logo' src={logoSvg} alt='Logo'
                    style={{ width: '200px' }} onClick={() => { navigation(`/`) }} />
            </div>
            <main>

                <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="CONTINUE WITH GOOGLE"
                    onSuccess={handelLogin}
                    onFailure={handelFailure}
                    cookiePolicy={'single_host_origin'}
                    scope="profile"
                ></GoogleLogin>


                {location.pathname === '/login' && (
                    <div className='login'>
                        <form className='login-form' onSubmit={onLogin}>
                            <h1>Log in to Listo</h1>
                            <OutlinedInput onChange={handleChange} autoFocus className='user-input'
                                placeholder='Enter username' variant='filled' type='text' name='username' />
                            <OutlinedInput onChange={handleChange} autoFocus className='user-input'
                                placeholder='Enter password' variant='filled' type='password' autoComplete='off'
                                name='password' />
                            <Button onClick={onLogin} className='login-btn'>
                                Log in
                            </Button>
                        </form>
                    </div>
                )}
                {location.pathname === '/signup' && (
                    <div className='signup'>
                        <form className='signup-form' onSubmit={onSignup}>
                            <h1>Signup to Listo</h1>
                            <OutlinedInput onChange={handleChange} autoFocus className='user-input'
                                placeholder='Enter fullname' variant='filled' type='text' name='fullname' />
                            <OutlinedInput onChange={handleChange}
                                autoFocus className='user-input' placeholder='Enter username'
                                variant='filled' type='text' name='username' />
                            <OutlinedInput onChange={handleChange} autoFocus className='user-input'
                                placeholder='Enter password' variant='filled'
                                type='password' autoComplete='off' name='password' />
                            <Button onClick={onSignup} className='signup-btn'>
                                Signup
                            </Button>
                        </form>
                    </div>
                )}
                <h3>or</h3>
                <Button className='social-btn google-btn'  >
                    <div className='google-container' >
                        <img className='google-logo' src={google} alt='Logo' style={{ width: '20px' }}
                            onClick={() => { navigation(`/`) }} />
                    </div>
                    <h2 >Continue with Google</h2>
                </Button>
                <Button className='social-btn microsoft-btn'>
                    <div className='microsoft-container'>
                        <img className='microsoft-logo' src={microsoft} alt='Microsoft logo'
                            style={{ width: '20px' }} onClick={() => { navigation(`/`) }} />
                    </div>
                    <h2>Continue with Microsoft</h2>
                </Button>
                <Button className='social-btn apple-btn'>
                    <div className='apple-container'>
                        <AppleIcon style={{ color: 'black' }} />
                    </div>
                    <h2>Continue with Apple</h2>
                </Button>
                <hr></hr>
                {location.pathname === '/login' && (
                    <div>
                        {msg && (<h2 className='msg'></h2>)}
                        <a onClick={() => { navigation(`/signup`) }} >
                            Sign up for an account
                        </a>
                    </div>
                )}
                {location.pathname === '/signup' && (
                    <a onClick={() => { navigation(`/login`) }} >
                        Already have an account? Log In
                    </a>
                )}
            </main>

            <div className='left-container'>
                <img className='left-img' src={leftImg} alt='image' />
            </div>
            <div className='right-container'>
                <img className='right-img' src={rightImg} alt='image' />
            </div>
        </div>
    )
}
