import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'
import logoSvg from '../assets/img/login-signup/logo.svg'
import leftImg from '../assets/img/login-signup/left.svg'
import rightImg from '../assets/img/login-signup/right.svg'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'

import AppleIcon from '@mui/icons-material/Apple'
import microsoft from '../assets/img/login-signup/microsoft.png'
import google from '../assets/img/login-signup/google.png'
import { ContactlessOutlined } from '@mui/icons-material'
import { useState } from 'react'
import { login, signup } from '../store/actions/user.action'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useEffectUpdate } from '../hooks/useEffectUpdate'
export function LoginSignup() {
    const navigation = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msg, setMsg] = useState('')
    const onLogin = async (ev = null) => {
        console.log('login:')
        console.log('username:', username)
        console.log('password:', password)
        const credentials = { username, password }
        const res = await dispatch(login(credentials))
        if(res) navigation('/workspace')
        else setMsg('can\'t login, try again')

    }

    // if (
    //     !this.state.credentials.username ||
    //     !this.state.credentials.password
    // )
    //     return
    // if (ev) ev.preventDefault()
    // this.props.onLogin(this.state.credentials)
    // this.clearState()

    const onSignup = (ev = null) => {
        console.log('signup:')
        console.log('username:', username)
        const credentials = { username, password }
        dispatch(signup(credentials))

        // if (
        //     !this.state.credentials.username ||
        //     !this.state.credentials.password
        // )
        //     return
        // if (ev) ev.preventDefault()
        // this.props.onSignup(this.state.credentials)
        // this.clearState()
    }

    const handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value
        switch (field) {
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
                <img
                    className='login-logo'
                    src={logoSvg}
                    alt='Logo'
                    style={{ width: '200px' }}
                    onClick={() => {
                        navigation(`/`)
                    }}
                />
            </div>

            <main>
                {location.pathname === '/login' && (
                    <div className='login'>
                        <form className='login-form' onSubmit={onLogin}>
                            <h1>Log in to Listo</h1>
                            <OutlinedInput
                                onChange={handleChange}
                                autoFocus
                                className='user-input'
                                placeholder='Enter username'
                                variant='filled'
                                type='text'
                                name='username'
                            />
                            <OutlinedInput
                                onChange={handleChange}
                                autoFocus
                                className='user-input'
                                placeholder='Enter password'
                                variant='filled'
                                type='password'
                                autoComplete='off'
                                name='password'
                            />
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
                            <OutlinedInput
                                onChange={handleChange}
                                autoFocus
                                className='user-input'
                                placeholder='Enter username'
                                variant='filled'
                                type='text'
                                name='username'
                            />
                            <OutlinedInput
                                onChange={handleChange}
                                autoFocus
                                className='user-input'
                                placeholder='Enter password'
                                variant='filled'
                                type='password'
                                autoComplete='off'
                                name='password'
                            />
                            <Button onClick={onSignup} className='signup-btn'>
                                Signup
                            </Button>
                        </form>
                    </div>
                )}
                <h3>or</h3>
                <Button className='social-btn google-btn'>
                    <div className='google-container'>
                        <img
                            className='google-logo'
                            src={google}
                            alt='Logo'
                            style={{ width: '20px' }}
                            onClick={() => {
                                navigation(`/`)
                            }}
                        />
                    </div>
                    <h2>Continue with Google</h2>
                </Button>
                <Button className='social-btn microsoft-btn'>
                    <div className='microsoft-container'>
                        <img
                            className='microsoft-logo'
                            src={microsoft}
                            alt='Microsoft logo'
                            style={{ width: '20px' }}
                            onClick={() => {
                                navigation(`/`)
                            }}
                        />
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
                    <a
                        onClick={() => {
                            navigation(`/signup`)
                        }}
                    >
                        Sign up for an account
                    </a>
                    </div>
                )}
                {location.pathname === '/signup' && (
                    <a
                        onClick={() => {
                            navigation(`/login`)
                        }}
                    >
                        Already have an account? Log In
                    </a>
                )}
            </main>

            <div className='left-container'>
                <img
                    className='left-img'
                    src={leftImg}
                    alt='image'
                    style={{ width: '400px' }}
                />
            </div>
            <div className='right-container'>
                <img
                    className='right-img'
                    src={rightImg}
                    alt='image'
                    style={{ width: '400px' }}
                />
            </div>
            {/* <h1>{location.pathname.substring(1)} page</h1> */}
        </div>
    )
}
