import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box className='progress-container' sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
      <Box className='progress-bar' sx={{ width: '100%'}}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

export function LinearWithValueLabel({ value }) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={value} />
    </Box>
  );
}
