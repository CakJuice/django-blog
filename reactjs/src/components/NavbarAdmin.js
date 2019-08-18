import React from 'react';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBCollapse,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink } from 'mdbreact';

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
      <MDBNavbar color="indigo" dark expand="md">
        <MDBContainer>
          <MDBNavbarBrand href="/">Homepage</MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleState} />
          <MDBCollapse isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav right>
              <MDBNavItem>
                <MDBNavLink tag={Link} to="/admin/">Dashboard</MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink tag={Link} to="/admin/categories/">Categories</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
  }
}

export default NavbarAdmin;
