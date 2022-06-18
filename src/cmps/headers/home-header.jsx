import Button from '@mui/material/Button'

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../../assets/img/listo.svg'

export const HomeHeader = () => {
    const navigation = useNavigate()
    const ref = useRef()
    const [isScrollOn, setScrollOn] = useState()

    const onHandleScroll = () => {
        console.log('got in');
        if (ref.current.offsetTop > 90) setScrollOn(true)
        else setScrollOn(false)
    }
    useEffect(() => {
        document.addEventListener('scroll', onHandleScroll)
        return () => {
            document.removeEventListener('scroll', onHandleScroll)
        }
    }, [])

    return (
        <div ref={ref} className={isScrollOn ? 'header flex scroll' : 'header flex'}>
            <div className='header-logo'>
                <img onClick={() => { navigation(`/`) }} src={Logo} />
            </div>
            <div className='header-btns flex'>
                <a className='login-btn' onClick={() => { navigation(`/login`) }}>
                    Log in
                </a>
                <Button onClick={() => { navigation(`/signup`) }}
                    variant='contained' size='medium'>
                    Signup
                </Button>
            </div>
        </div>
    )
}
