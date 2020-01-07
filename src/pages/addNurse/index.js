import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.scss';
import Spinner from '../../components/common/spinner';
import ErrorText from '../../components/common/errorText';


export class WardNurse extends React.Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
      addNurseEndpoint: 'https://rd-backend-trial.herokuapp.com/api/nurse',
      addingNurseStarted: false,
      addingNurseResolved: false,
      addingNurseError: null,
      input: {
        name: '',
        email: '',
        wardName: '',
      },
    };
  }

  getInput = (event) => {
    const state = { ...this.state };
    state.input[event.target.name] = event.target.value;
    this.setState(state);
  }

  inputsAreValid = (inputs) => {
    let inputIsValid = true;
    const { name, email, wardName } = inputs;
    if (!name || typeof name !== 'string') inputIsValid = false;
    if (!email || typeof email !== 'string') inputIsValid = false;
    if (!wardName || typeof wardName !== 'string') inputIsValid = false;
    return inputIsValid;
  }

  addNurse = (event) => {
    event.preventDefault();
    const { name, email, wardName } = this.state.input;
    if (!this.inputsAreValid({ name, email, wardName })) {
      return this.setState({
        addingNurseError: 'Some input fields are not properly filled'
      });
    }
    this.setState({ addingNurseStarted: true });
    axios.post(this.state.addNurseEndpoint, { ...this.state.input, phoneNo: this.state.input.wardName }, {
      headers: {
        // staging request token, shoudl last 3 days
        'req-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoid2FyZF91c2VyIiwiaWQiOiI1ZGJhZDQyMTc0ZGYzOTAwMjIxYTU1ZjIiLCJpYXQiOjE1NzgzOTAxMDAsImV4cCI6MTU3ODY0OTMwMH0.N7rwRG9kGTBFbb1a-Dp2z9c9xNcDyhZW0KVPGUmw3Z0',  
      }
    })
      .then((response) => {
        this.setState({ addingNurseStarted: false, addingNurseResolved: true, addingNurseError: null });
        console.log('Creating nurse user respone: ', response)
        this.props.history.push('/ward-nurse');
      })
      .catch((err) => {
        this.setState({
          addingNurseStarted: false,
          addingNurseResolved: false,
          addingNurseError: 'Error occured creating this nurse user, check logs for details'
        });
        console.log('Adding nurse user error: ', err);
      })
  }

  handleClick = () => {
    this.setState({ showMenu: !this.state.showMenu })
  }


  render() {
    if (this.props.addingUserResolved) {
      return (<Redirect to="/email-confirmation" />);
    }
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

              <div id="addNurseContent">
                <h2 className="formTitle">Add new nurse user</h2>
                <ErrorText text={this.state.addingNurseError} />
                <p label="name">Name</p>
                <input type="text" for="name" name="name" onChange={this.getInput} />
                <p label="email">Email</p>
                <input type="text" for="email" name="email" onChange={this.getInput} />
                <p label="wardName">Ward Name</p>
                <input type="text" for="email" name="wardName" onChange={this.getInput} />
                <div className="loader">
                  <button disabled={this.state.addingNurseStarted} onClick={this.addNurse}>Add</button>
                  <Spinner display={this.state.addingNurseStarted} height={40} />
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

export default connect(mapStateToProps)(WardNurse);
