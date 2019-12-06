import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from '../../components/common/ProgressBar';

const Infusion = ({ flowrate, timeRemaining, volumeGivenPercent, onClick }) => {
  return (
    <ul className="list_heading_ul ul_contnt active_dsh_list" onClick={onClick}>
      <li>
        <div className="bld_prcnt">{volumeGivenPercent}</div>
        <ProgressBar percentageComplete={volumeGivenPercent}/>
        <div className="bld_txt">Saline Water</div>
      </li>
      <li>
        <div className="time_in_second bld_txt">{timeRemaining}</div>
      </li>
      <li>
        <div className="speed_hr"> <span> {flowrate} </span> <img class="speed_up" src={require('../../assets/Images/dummy_logo.jpg')}></img></div>
      </li>
      <li>
        <div className="infusn_usr_img"><img src={require('../../assets/Images/user.png')}></img></div>
        <div className="infusn_usr_name">Titlayo Olaide</div>
      </li>
      <li>
        <div className="infusn_usr_fname">Frank</div>
        <div className="infusn_disease_name">Malaria</div>
      </li>
    </ul>
  )
};

Infusion.prototype = {
  flowrate: PropTypes.string.isRequired,
  timeRemaining: PropTypes.string.isRequired,
  volumeGivenPercent: PropTypes.string.isRequired,
}

export default Infusion;
