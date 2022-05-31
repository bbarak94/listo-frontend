import Logo from '../assets/img/listo.svg'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'

export const HomeHeader = () => {
    const navigation = useNavigate()
    const ref = useRef()
    const [isScrollOn, setScrollOn] = useState()

    const onHandleScroll = () => {
        if (ref.current.offsetTop > 90) setScrollOn(true)
        else setScrollOn(false)
        // console.log(document.body.scrollTop);
    }
    // var rect = element.getBoundingClientRect();
    window.onscroll = () => onHandleScroll()

    return (
        <div ref={ref} className={isScrollOn ? 'header flex scroll' : 'header flex'}>
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
