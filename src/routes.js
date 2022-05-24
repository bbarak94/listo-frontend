import {Home} from './pages/home.jsx'
import {BoardDetails} from './pages/board-details.jsx'
import {TaskDetails} from './pages/task-details.jsx'

const routes = [
   {
      path: '/',
      component: <Home />,
      label: 'Home'
   },
   {
      path: '/board/:boardId',
      component: <BoardDetails />,
      label: 'Board',
      children: [
         {
            path: '/task/:taskId',
            component: <TaskDetails />,
            label: 'Task'
         }
      ]
   },
   {
      path: '/task/:taskId',
      component: <TaskDetails />,
      label: 'Task'
   },
   {
      path: '/',
      component: <Home />,
      label: 'Home'
   },

]