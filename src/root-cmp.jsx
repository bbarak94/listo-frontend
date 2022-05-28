import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home.jsx'
import { BoardDetails } from './pages/board-details.jsx'
import { Workspace } from './pages/workspace.jsx'
import { TaskDetails } from './pages/task-details.jsx'
import { LoginSignup } from './pages/login-signup.jsx'
import configureStore from './configure-store.js'
import {Provider} from 'react-redux'
const store = configureStore()



export function RootCmp() {
    
    return (
        <Provider store={store}>
        <Router>
            <div className='root-cmp'>
                <Routes>
                    <Route path='login' element={<LoginSignup />} />
                    <Route path='signup' element={<LoginSignup />} />
                    <Route path='workspace' element={<Workspace />} />
                    <Route path='board/:boardId' element={<BoardDetails />}>
                        <Route path='task/:taskId' element={<TaskDetails />} />
                    </Route>
                    <Route path='/' element={<Home />} />
                </Routes>
            </div>
        </Router>
        </Provider>
    )
}

{
    /* <Routes>
{routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
</Routes> */
}
