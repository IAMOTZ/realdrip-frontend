import React from 'react';
import PropTypes from 'prop-types';


const ProgressBar = ({ percentageComplete }) => {
  return (<div className="wrapper_progress_bar" style={{backgroundColor: '#0FBB8333'}}>
    <div className="inner_progress_bar" style={{width: percentageComplete, backgroundColor: '#0FBB83'}}>
    </div>
  </div>)
}

ProgressBar.propType = {
  percentageComplete: PropTypes.string.isRequired,
}

export default ProgressBar;