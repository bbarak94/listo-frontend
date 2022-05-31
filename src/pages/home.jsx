import hero from '../assets/img/hero/hero.png'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'
import { HomeHeader } from '../cmps/home-header'
import { useEffect } from 'react'
import { loadUsers } from '../store/actions/user.action'
import { useDispatch } from 'react-redux'

import brand1 from '../assets/img/home-page/brand1.svg'
import brand2 from '../assets/img/home-page/brand2.svg'
import brand3 from '../assets/img/home-page/brand3.svg'
import brand4 from '../assets/img/home-page/brand4.svg'
import brand5 from '../assets/img/home-page/brand5.svg'
import brand6 from '../assets/img/home-page/brand6.svg'

import preview1 from '../assets/img/home-page/preview3.jpg'
import preview2 from '../assets/img/home-page/preview4.jpg'

export const Home = () => {

    const navigation = useNavigate()
    const dispatch = useDispatch()
    // useEffect(() => {
    //     dispatch(loadUsers())
    // }, [])


    return (
        <section className='home'>
            <HomeHeader />
            <div className='home-main-layout flex'>
                <div className='home-left-container flex column justify-center'>
                    <h1>Listo helps teams move work forward.</h1>
                    <p>
                        Collaborate, manage projects, and reach new productivity
                        peaks. From high rises to the home office, the way your
                        team works is unique-accomplish it all with Listo.
                    </p>

                    <Button
                        onClick={() => {
                            navigation(`/workspace`)
                        }}
                        variant='contained'
                        size='medium'
                    >
                        Start Demo
                    </Button>
                </div>

                <div className='hero-img-container flex align-center'>
                    <img src={hero} alt='home' />
                </div>
            </div>
            <div className='home-content-container flex column align-center'>
                <h2>
                    It's more than work. It's a way of working together.
                </h2>

                <p>
                    Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one place.
                </p>

                <button className='btn' onClick={() => { navigation(`/signup`) }}>
                    Start Doing →
                </button>

                <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png" alt="" />

                <p>
                    Join over 1,000,000 teams worldwide that are using Trello to get more done.
                </p>

                <div className="brand-logos flex">
                    <img src={brand1} alt="" />
                    <img src={brand2} alt="" />
                    <img src={brand3} alt="" />
                    <img src={brand4} alt="" />
                    <img src={brand5} alt="" />
                    <img src={brand6} alt="" />
                </div>

            </div>
            <div className="home-preview flex justify-center align-center">
                {/* <div className='img-container'> */}
                <img src={preview1} alt="" />
                {/* </div> */}
                <div className="content flex column">
                    <h2>Plan, execute, and track projects of any size</h2>
                    <p>Easily assign tasks and prioritize what's most important to your team. Set project timeline, milestones and dependencies, and manage your team's entire workload all in one place.</p>
                </div>
            </div>

            <div className="home-preview flex justify-center align-center">
                <div className="content flex column">
                    <h2>100% customizable and flexible to fit any workflow</h2>
                    <p>There are many ways to manage a single project. Shape your workflow the way that works for your team - for any project, process, department, or customer.</p>
                </div>
                <img src={preview2} alt="" />
            </div>

        </section>
    )
}
