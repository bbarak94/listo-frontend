
import React from 'react'
import { Chart as ChartJS, CategoryScale, ArcElement, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import CloseIcon from '@mui/icons-material/Close';

import hourGlass from '../assets/img/dashboard/hour-glass.png'

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
    skipNull: true,
    legend: {
        labels: {

            fontColor: "#fff"
        }
    },
    scales: {
        x: {
            ticks: {
                color: "#fff"
            }
        },
        y: {
            ticks: {
                color: "#fff"
            }
        }
    }
}
const paiOptions = {
    legend: {
        labels: {
            fontColor: "#fff"
        }
    },

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


    return <section className="dashboard flex column justify-center align-center">
        <h1 className='dashboard-title'>{board.title}</h1>

        <CloseIcon onClick={exit} className="exit-dashboard" style={{ color: '#ffff' }} />

        <div className="dashboard-container">

            <div className="top-container flex justify-center align-center">
                <div className="all-tasks-container">
                    <h1>All Tasks</h1>
                    <h1>{boardData.totalTasksCount}</h1>
                </div>
                <div className='dashboard-bar-container'>
                    <Bar className='dashboard-bar' options={barOptions} data={getBarData()} />
                </div>
            </div>

            <div className="bottom-container flex justify-center align-center">
                <div className="dashboard-pai-container">
                    <Pie className='dashboard-pai' options={paiOptions} data={getPaiData()} />
                </div>
                <div className="tasks-status-container">
                    <div className="hour-glass-container">
                        <img src={hourGlass} alt="Due" />
                    </div>
                    <div className="due-container flex column ">

                        <div className="flex align-center space-between">
                            <h2>{boardData.dueTasksCount}</h2> <h1>On Due</h1>
                        </div>
                        <div className="flex align-center space-between">
                            <h2>{boardData.overDueTasksCount}</h2> <h1>Overdue</h1>
                        </div>
                        <div className="flex align-center space-between">
                            <h2>{boardData.completedTasksCount}</h2> <h1>Completed</h1>
                        </div>
                        {/* <h1>{boardData.dueTasksCount} On Due</h1>
                        <h1>{boardData.overDueTasksCount} Overdue</h1>
                        <h1>{boardData.completedTasksCount} Completed</h1> */}
                    </div>
                </div>
            </div>
        </div>

    </section>

}


