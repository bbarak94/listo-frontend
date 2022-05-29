import { useLocation, useNavigate } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'
import logoSvg from '../assets/img/login-signup/logo.svg'
import leftImg from '../assets/img/login-signup/left.svg'
import rightImg from '../assets/img/login-signup/right.svg'
import Button from '@mui/material/Button'
import OutlinedInput from '@mui/material/OutlinedInput'

import AppleIcon from '@mui/icons-material/Apple'
import microsoft from '../assets/img/login-signup/microsoft.png'
import google from '../assets/img/login-signup/google.png'

export function LoginSignup() {
    const navigation = useNavigate()
    const location = useLocation()
    // const params = useParams()
    console.log('location.pathname:', location.pathname)
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
            {(location.pathname==='/login') && <div className='login'>
                    <h1>Log in to Listo</h1>
                    <OutlinedInput
                        autoFocus
                        className='user-input'
                        placeholder='Enter username'
                        variant='filled'
                        type='text'
                    />
                    <OutlinedInput
                        autoFocus
                        className='user-input'
                        placeholder='Enter password'
                        variant='filled'
                        type='password'
                    />
                    <Button className='login-btn'>Log in</Button>
                </div>}
                {(location.pathname==='/signup') && <div className='signup'>
                    <h1>Signup to Listo</h1>
                    <OutlinedInput
                        autoFocus
                        className='user-input'
                        placeholder='Enter username'
                        variant='filled'
                        type='text'
                    />
                    <Button className='signup-btn'>Signup</Button>
                </div>}
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
                    <AppleIcon style={{ color: 'black' }} />
                    <h2>Continue with Apple</h2>
                </Button>
                <hr></hr>
                <a>Sign up for an account</a>
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
