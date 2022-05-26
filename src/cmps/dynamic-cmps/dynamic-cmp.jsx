import * as React from 'react'
import Popover from '@mui/material/Popover'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import { DynamicBtn } from './dynamic-button'
import { DynamicContent } from './dynamic-content'

export function DynamicPopup(props) {
    return (
        <div>
            <PopupState variant='popover' popupId='demo-popup-popover'>
                {(popupState) => (
                    <div>
                        <DynamicBtn
                            name={props.name}
                            bindTrigger={bindTrigger}
                            popupState={popupState}
                        />
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
                            <DynamicContent name={props.name} />
                        </Popover>
                    </div>
                )}
            </PopupState>
        </div>
    )
}
