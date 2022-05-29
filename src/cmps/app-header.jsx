import navBar from '../assets/img/header/navbar.svg'
import downArrow from '../assets/img/header/down-arrow.svg'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'



export const AppHeader = () => {
    const navigation = useNavigate()
    return (
        <div className='app-header flex align-center'>
            <div className='app-header-btn-container flex'>
                <div className='app-header-navbar-container'>

                    <img
                        src={navBar}
                        alt='navigate'
                        style={{ width: '22px' }}
                    />
                </div>

                <div
                    className='app-header-logo-static flex'
                    style={{ width: '80px' }}
                    onClick={() => {
                        navigation(`/`)
                    }}
                >
                    <img
                        src='https://res.cloudinary.com/bbarak94/image/upload/v1653768105/ListoStatic2_z2ecxu.gif'
                        alt='navigate'
                        style={{ maxWidth: '110px' }}
                        onMouseOver={(ev) => {
                            ev.target.src =
                                'https://res.cloudinary.com/bbarak94/image/upload/v1653770099/Listo2-3_modsj8.gif'
                        }}
                        onMouseOut={(ev) => {
                            ev.target.src =
                                'https://res.cloudinary.com/bbarak94/image/upload/v1653768105/ListoStatic2_z2ecxu.gif'
                        }}

                    />
                </div>

                <Button className='app-header-btn'>
                    Workspaces
                    <div className='app-header-navbar-container'>
                        <img
                            src={downArrow}
                            alt='navigate'
                            style={{ width: '22px' }}
                        />
                    </div>
                </Button>
                <Button className='app-header-btn'>
                    Recent
                    <div className='app-header-navbar-container'>
                        <img
                            src={downArrow}
                            alt='navigate'
                            style={{ width: '22px' }}
                        />
                    </div>
                </Button>
                <Button className='app-header-btn'>
                    Starred
                    <div className='app-header-navbar-container'>
                        <img
                            src={downArrow}
                            alt='navigate'
                            style={{ width: '22px' }}
                        />
                    </div>
                </Button>
                <Button className='app-header-btn'>
                    Templates
                    <div className='app-header-navbar-container'>
                        <img
                            src={downArrow}
                            alt='navigate'
                            style={{ width: '22px' }}
                        />
                    </div>
                </Button>
            </div>
        </div>
    )
}
