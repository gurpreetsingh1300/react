var React = require('react');
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Action from '../Actions/Action';
import { withRouter } from 'react-router';

class Navigation extends React.Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
    this.onFnf = this.onFnf.bind(this);
  }
  onLogout() {
    event.preventDefault();
    this.props.history.push('/');
    Action.Logout();
  }
  onFnf() {
    alert("This functionality is yet to be implemented.");
  }
  render() {
    return (
      <React.Fragment>
        <Navbar inverse style={{ "height": "75px" }}>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#"><img height="55px" src="../assets/images/csp1.png" /></a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="/">
                Logout
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    );
  }
};

export default withRouter(Navigation);
