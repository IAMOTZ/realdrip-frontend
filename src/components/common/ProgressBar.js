import React from 'react';
import PropTypes from 'prop-types';


const ProgressBar = ({ percentageComplete }) => {
  return (<div className="wrapper_progress_bar">
    <div className="inner_progress_bar" style={{width: percentageComplete}}>
    </div>
  </div>)
}

ProgressBar.propType = {
  percentageComplete: PropTypes.string.isRequired,
}

export default ProgressBar;