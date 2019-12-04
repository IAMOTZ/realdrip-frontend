import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Infusion from './Infusion';
import firebaseApp from 'firebase/app';
import firebase from 'firebase';
import fbConfig from '../../fbConfig';

export class WardDashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      rawInfusionData: null,
      formattedInfusionData: [],
    };
  }

  componentDidMount(){
    firebaseApp.initializeApp(fbConfig);
    const self = this;
    firebase.database().ref('/devices').on('value', function(snapshot) {
      const data = snapshot.val();
      self.setState({ rawInfusionData: data });
      const formattedData = [];
      for(let key in data) {
        const device = data[key];
        device.id = key;
        formattedData.push(device)
      }
      self.setState({ formattedInfusionData: formattedData });
    });
  }

  handleRedirectClick = (infusionId) => {
    const location = {
      pathname: `/operation-detail/${infusionId}`,
      state: {
        infusionId,
        infusion: this.state.rawInfusionData[infusionId]
      }
    }
    this.props.history.push(location)
  }

  renderActiveInfusions() {
    const activeInfusions = this.state.formattedInfusionData.filter(infusion => {
      return infusion.onOperatin === "true";
    });
    return (
      activeInfusions.map(infusion => (
        <Infusion 
          onClick={() => this.handleRedirectClick(infusion.id)} 
          key={infusion.id} 
          flowrate={infusion.flowrate} 
          timeRemaining={infusion.timeRemaining} 
          volumeGivenPercent={infusion.volumeGivenPercent} 
          />
        ))
    )
  }

  handleClick = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }

  render() {
    return (
      <div className="main_wrapper ">
        <div className="inner_dshbrd_wrap">
          <div className="left_dashboard">
            <div className="inner_left_dashboard">
              <div className="logo" onClick={this.handleClick}><i class="fa fa-bars"></i></div>
              <ul className="menu_wrap">
                <Link to="/ward-dashboard" ><li><img src={require('../../assets/Images/menu1_active.png')} /> </li></Link>
                <Link to="/ward-operation"><li><img src={require('../../assets/Images/menu4.png')} /></li></Link>
                <Link to="/ward-device"><li><img src={require('../../assets/Images/menu2.png')} /></li></Link>
                <Link to="/ward-nurse"><li><img src={require('../../assets/Images/menu5.png')} /></li></Link>
                <Link to="/ward-setting"><li><img src={require('../../assets/Images/menu3.png')} /></li></Link>
              </ul>
            </div>
          </div>
          <div className="right_dashboard">
            <div className="header_dash">
              <div className="header_right_dash">
                <img src={require('../../assets/Images/dummy_logo.jpg')} />
                <span class="logo_hedng">RealDrip</span>
                <span className="ward">Ward</span>
              </div>
              <div className="header_left_dash">
                <span>How it works</span>
              </div>
            </div>

            <div class="mid-section-dshbrd">
              {this.state.showMenu && <div className="second_menu_wrap">
                <ul>
                  <li>Home</li>
                  <li>Operations</li>
                  <li>Devices</li>
                  <li>Nurses</li>
                  <li>Account</li>
                </ul>
                <ul>
                  <li>Sign Out</li>
                </ul>
              </div>}
              <div className="inner_dash">
                <div className="left-mid-dash">
                  <h2>Dashboard</h2>
                  <h4 class="sumry_head">Summary</h4>
                  <div className="wrap_left_section">
                    <div className="dash_ward_oprtn_wrap">
                      <div className="urgnt_oprtn_wrap">
                        <div className="urgnt_row">
                          <span className="urgnt_txt">Urgent</span>
                          <span className="drip_img_wrap"><i class="fa fa-bell cstm_bell"></i></span>
                        </div>
                        <div className="urgnt_number_wrap">
                          <span className="cirlcle_dot"></span>
                          <span className="number_txt_white">1</span>
                        </div>
                        <div align="center">
                          <h5>Operation</h5>
                          <span>is almost Complete</span>
                        </div>
                      </div>
                      <div className="infusn_nrse_wrap">
                        <div className="infusn_wrap">
                          <div className="wrpd_icon_num">
                            <span className="urgnt_txt">6</span>
                            <span className="drip_img_wrap"><img src={require('../../assets/Images/drip.png')} /></span>
                          </div>
                          <h5>Active Infusion</h5>
                        </div>
                        <div className="infusn_wrap active_nurse">
                          <div className="wrpd_icon_num">
                            <span className="urgnt_txt">6</span>
                            <span className="drip_img_wrap"><img src={require('../../assets/Images/drip.png')} /></span>
                          </div>
                          <h5>Active Infusion</h5>
                        </div>
                      </div>
                    </div>


                    <div className="device_in_use_wrapper">
                      <div className="device_inuse">
                        <span class="urgnt_txt">02</span>
                        <span className="drip_img_wrap"><img class="device_inuse_img" src={require('../../assets/Images/drip.png')} /></span>
                      </div>
                      <div className="device_inuse">
                        <span class="devide_inuse_txt">Devide in use</span>
                        <span className="device_idle"><span className="idle_number">45</span> <span className="idle_txt">Idle</span></span>
                      </div>
                    </div>

                    <div className="device_in_use_wrapper time_left_wrapper">
                      <div className="device_inuse">
                        <span class="tag_name">Tag Name</span>
                        <span className="tag_name">Time left</span>
                      </div>
                      <div className="device_inuse">
                        <span class="tag_name">B4</span>
                        <span className="device_idle">00:12:20</span>
                      </div>
                      <div className="device_inuse">
                        <span class="tag_name">B17</span>
                        <span className="device_idle">01:40:20</span>
                      </div>
                      <div className="device_inuse see_all_wrap"><span class="see_all_txt">see all</span></div>
                    </div>
                  </div>
                </div>
                <div className="right-mid-dash">
                  <div className="right-wrap-heading">
                    <div className="infusion_wrap">
                      <h4 class="sumry_head2">Active Infusion</h4>
                      <span class="see_all_txt">see all</span>
                    </div>
                    <div class="dash_active_wrap">
                      <ul className="list_heading_ul">
                        <li>Volume</li>
                        <li>Countdown</li>
                        <li>Flowerate</li>
                        <li>Nurse</li>
                        <li>Patient Case</li>
                      </ul>
                      {this.renderActiveInfusions()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // addingUserStarted: state.user.createAdmin.addingUserStarted,
  // addingUserResolved: state.user.createAdmin.addingUserResolved,
  // addingUserError: state.user.createAdmin.addingUserError,
});

export default connect(mapStateToProps)(WardDashBoard);
