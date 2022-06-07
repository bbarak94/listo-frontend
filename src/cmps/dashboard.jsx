
import React from 'react'
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js'

import { Bar, Pie } from 'react-chartjs-2'

import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'

const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    pan: {
        enabled: true,
        mode: "xy"
    },
    zoom: {
        enabled: true,
        mode: "xy"
    },
    skipNull: true
}

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)
export const Dashboard = ({ board, exit }) => {


    const boardData = boardService.getDataForDashboard(board)

    const getBarData = () => {
        return {
            labels: boardData.tasksPerMembers.members,
            datasets: [{
                label: "Tasks",
                data: boardData.tasksPerMembers.count,
                backgroundColor: boardData.tasksPerMembers.members.map(() => utilService.getRandomColor())
            }]
        }
    }

    const getPaiData = () => {
        return {
            labels: boardData.tasksPerLabels.title,
            datasets: [
                {
                    label: 'Labels',
                    data: boardData.tasksPerLabels.count,
                    backgroundColor: boardData.tasksPerLabels.colors,
                    borderWidth: 1,
                }
            ]
        }
    }


    return <section className="dashboard">
        <div onClick={exit} className="exit-dashboard flex justify-center align-center">X</div>
        <div className="dashboard-container">
            <div className="all-tasks-container">
                <h1>All Tasks</h1>
                <h1>{boardData.totalTasksCount}</h1>
            </div>
            <Bar className='dashboard-bar' options={barOptions} data={getBarData()} />
            <Pie className='dashboard-pai' data={getPaiData()} />
            <div className="tasks-status-container">
                <h1>{boardData.dueTasksCount} On Due</h1>
                <h1>{boardData.overDueTasksCount} Overdue</h1>
                <h1>{boardData.completedTasksCount} Completed</h1>
            </div>
        </div>

    </section>

}


