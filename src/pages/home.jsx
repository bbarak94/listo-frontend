import hero from '../assets/img/hero/hero.png'
import Button from '@mui/material/Button'
import { Link, useNavigate } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'
import { useEffect } from 'react'
// import {loadUsers} from '../store/actions/user.action'
import { useDispatch } from 'react-redux'

export const Home = () => {

    const navigation = useNavigate()
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(loadUsers())
    // }, [])


    return (
        <div className='home'>
            <HomeHeader />
            <div className='home-main-layout flex '>
                <div className='home-left-container flex column'>
                    <h1>Listo helps teams move work forward.</h1>
                    <p>
                        Collaborate, manage projects, and reach new productivity
                        peaks. From high rises to the home office, the way your
                        team works is unique-accomplish it all with Listo.
                    </p>

                    <Button
                        style={{ textTransform: 'unset' }}
                        onClick={() => {
                            navigation(`/workspace`)
                        }}
                        variant='contained'
                        size='medium'
                    >
                        Start Demo
                    </Button>
                </div>

                <div className='hero-img-container flex align-center justify-center'>
                    <img src={hero} alt='home' />
                </div>
            </div>
        </div>
    )
}
