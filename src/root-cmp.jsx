import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home.jsx'
import { BoardDetails } from './pages/board-details.jsx'
import { Workspace } from './pages/workspace.jsx'
import { TaskDetails } from './pages/task-details.jsx'
import { AppHeader } from './cmps/app-header'
import { LoginSignup } from './pages/login-signup.jsx'



export function RootCmp() {
    
    return (
        <Router>
            <div className='root-cmp'>
                <AppHeader />
                <Routes>
                    <Route path='login' element={<LoginSignup />} />
                    <Route path='signup' element={<LoginSignup />} />
                    <Route path='workspace' element={<Workspace />} />
                    <Route path='/board/:boardId' element={<BoardDetails />}>
                        <Route path='task/:taskId' element={<TaskDetails />} />
                    </Route>
                    <Route path='/' element={<Home />} />
                </Routes>
            </div>
        </Router>
    )
}

{
    /* <Routes>
{routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
</Routes> */
}
