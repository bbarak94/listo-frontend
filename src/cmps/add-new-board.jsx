import * as React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { EditNewBoard } from './edit-new-board.jsx'

export function AddNewBoard({onCreateNewBoard}) {
    return (
        <div>
            <PopupState variant='popover' popupId='demo-popup-popover'>
                {(popupState) => (
                    <div>
                        {/* <Button variant="contained" {...bindTrigger(popupState)}>
            Open Popover
          </Button> */}

                        <div
                            {...bindTrigger(popupState)}
                            className='board-preview flex column align-center justify-center'
                            style={{
                                backgroundColor: '#091e420a',
                                minHeight: 104,
                                minWidth: 194,
                                margin: '14px 0',
                                padding: 0,
                            }}
                            // onClick={() => {
                            //     console.log('new board created')
                            //     onCreateNewBoard()
                            // }}
                        >
                            <div>
                                <h2
                                    style={{
                                        color: '#172b4d',
                                        margin: 'auto',
                                        fontSize: '14px',
                                    }}
                                >
                                    create new board
                                </h2>
                            </div>
                        </div>

                        {/* <Button variant="contained" {...bindTrigger(popupState)}>
            Open Popover
          </Button> */}
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'center',
                                horizontal: 'left',
                            }}
                        >
                            {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
                            <Typography sx={{ p: 2 }}>
                                <EditNewBoard onCreateNewBoard={onCreateNewBoard}/>
                            </Typography>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    )
}
