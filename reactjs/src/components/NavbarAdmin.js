import React from 'react';
import { Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

class NavbarAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleState = this.toggleState.bind(this);
  }

  toggleState(e) {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <div className="container">
          <NavbarBrand href="/">Homepage</NavbarBrand>
          <NavbarToggler onClick={this.toggleState} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/admin/">Dashboard</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/admin/categories/">Categories</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default NavbarAdmin;
