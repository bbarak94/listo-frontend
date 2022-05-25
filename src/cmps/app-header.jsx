import Logo from '../assets/img/listo.svg'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'

export const AppHeader = () => {
    const navigation = useNavigate()

    return (
        <div className='header flex'>
            <div className='header-logo'>
                <img 
                onClick={() => {
                        navigation(`/`)
                    }}
                src={Logo}></img>
            </div>
            
            <div className='header-btns flex'>
                <a
                    className='login-btn'
                    onClick={() => {
                        navigation(`/login`)
                    }}
                >
                    Log in
                </a>
                <Button
                    onClick={() => {
                        navigation(`/signup`)
                    }}
                    variant='contained'
                    size='medium'
                >
                    Signup
                </Button>
            </div>
        </div>
    )
}
