import React from 'react';
import Login from './Login';

class LoginForm extends React.Component {
  render() {
    return (
      <div>
        <div>
          <a href="/" style={{ "paddingLeft": "15px" }}><img width="auto" height="75px" src="assets/images/csp1.png" /></a>
        </div>
        <div className="jumbotron" style={{ "opacity": "0.85" }}>
          <div className="container">
            <h1>Customer Service Portal</h1>
            <p>Your one point contact for issues related to the purchased products.</p>
          </div>
        </div>
        <div className={"container"} id="wrap">
          <div className={"row bgClass"} style={{ "marginTop": "15px", "marginBottom": "45px" }}>
            <div className={"col-md-5 col-md-offset-7"}>
              <Login/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginForm;
