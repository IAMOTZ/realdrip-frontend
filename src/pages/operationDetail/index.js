import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import ProgressBar from '../../components/common/ProgressBar';


export class OperationDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      showMenu:false
    };
  }

  handleClick = () =>{
    this.setState({showMenu : !this.state.showMenu})
  }


  render() {
    const { location } = this.props;

    if(!location.state || !location.state.infusionId) {
      return <Redirect to="/ward-dashboard"/>
    }

    const { infusion } = location.state;
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
            
                <div className="oprtn_dlt_wrap">
                   <div className="patnt_name">
                      <h2>Frank Jacobs</h2>
                   </div>
                   
                    <div className="add_new_device_wrap">
                        <div className="add_device_btn">Delete Operation</div>
                    </div>
                </div>
                <div className="patnt_list_wrap">
                        <ul className="patnt_ul_list">
                            <li>
                                <div className="nurc_img_wrap">
                                  <img  src={require('../../assets/Images/user.png')}/>
                                </div>
                                <div className="nurc_detail_wrap">
                                    <span className="nurc_post">Nurse</span>
                                    <span className="nurc_name">Tatilayo Olaide</span>
                                </div>
                            </li>
                            <li>
                                
                                <div className="nurc_detail_wrap">
                                    <span className="nurc_post">Nurse</span>
                                    <span className="nurc_name">Tatilayo Olaide</span>
                                </div>
                            </li>
                            <li>
                                
                                <div className="nurc_detail_wrap">
                                    <span className="nurc_post">Nurse</span>
                                    <span className="nurc_name">Tatilayo Olaide</span>
                                </div>
                            </li>
                            <li>
                                
                                <div className="nurc_detail_wrap">
                                    <span className="nurc_post">Nurse</span>
                                    <span className="nurc_name">Tatilayo Olaide</span>
                                </div>
                            </li>
                        </ul>
                    </div>
               
                <div className="inner_dash">
                  <div className="left-mid-dash">
                  
                  <div className="wrap_left_section">
                    <div className="dash_ward_device_wrap oprtn_wrap">
                    
                    <div className="infusn_wrap device_infusn oprtn_dtl_wrd">
                          <div className="wrpd_icon_num">
                            <span className="urgnt_txt">
                                <h3 className="prcnt_opt_detail">{infusion.volumeGivenPercent}</h3>
                                <h5 className="prcnt_op_txt">Dispensed {infusion.volumeGiven}</h5>
                                <ProgressBar percentageComplete={infusion.volumeGivenPercent}/>
                            </span>
                            <span className="drip_img_wrap"><img src={require('../../assets/Images/drip.png')} /></span>
                          </div>
                     </div>
                     <div className="infusn_wrap device_infusn  oprtn_dtl_wrd">
                          <div className="wrpd_icon_num">
                            <span className="urgnt_txt">
                                <div className="wrapper_blood_flow">
                                  <h3 className="prcnt_opt_detail">{infusion.flowrate && infusion.flowrate.replace('ml/hr', '')}</h3>&nbsp;
                                  <span className="bloodflow">ml/h</span> <span className="deg"></span>
                                </div>
                                <h5 className="prcnt_op_txt">Current flowrate</h5>
                            </span>
                            <span className="drip_img_wrap"><img src={require('../../assets/Images/drip.png')} /></span>
                          </div>
                     </div>
                     <div className="infusn_wrap device_infusn  oprtn_dtl_wrd">
                     <div className="wrpd_icon_num">
                            <div className="startvlm_wrap">
                                <h5 className="vlm_txt">420cl</h5>
                                <h5 className="vlm_op_txt">Stat Volume</h5>
                            </div>
                            <span className="dot-dot-line"></span>
                            <div className="startvlm_wrap">
                                <h5 className="vlm_txt_right">420cl</h5>
                                <h5 className="vlm_op_txt">Stat Volume</h5>
                            </div>
                      </div>
                      <div className="down_arrow_wrap">
                        <i class="fa fa-caret-down green_down"></i>
                        <i class="fa fa-caret-down red_down" ></i>
                      </div>
                      <div className="thrd_progress_wrap"><div className="wrapper_progress_bar middle_bar"><div className="inner_progress_bar"></div></div></div>

                     </div>

                    </div>
                    </div>
                  </div>
                  <div className="right-mid-dash">
                    <div className="right-wrap-heading devics_lst_clmn">  
                      <h3>Doctor Instruction</h3>
                      <div class="dash_active_wrap whitebg">
                         <div className="oprtn_instrtn_wrap">
                             <h5>Instruction</h5>
                             <div>1. give patient 360ml of blood</div>
                             <div>2. let him have a 30 minute of sleep</div>
                         </div>
                      </div>
                      
                      <div className="device_page_wrap">
                      <h3>Device Control</h3>
                        <div className="add_device_page_btn">Device Page</div>
                    </div>
                      <div class="dash_active_wrap2">
                         <div className="oprtn_device_control whitebg">
                             <div>Pause</div>
                             <div className="cstm_icon"><i class="fa fa-play" aria-hidden="true"></i></div>
                         </div>
                         <div className="oprtn_device_control whitebg">
                             <div>Pause</div>
                             <div className="cstm_icon"><i class="fa fa-repeat" aria-hidden="true"></i></div>
                         </div>
                         <div className="oprtn_device_control whitebg">
                             <div>Pause</div>
                             <div className="cstm_icon"><i class="fa fa-play" aria-hidden="true"></i></div>
                         </div>
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

export default connect(mapStateToProps)(OperationDetail);
