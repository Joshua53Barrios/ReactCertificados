import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap'; 

  function NavBar() {

    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
      <div>
        <Navbar color="faded" light className="navbar navbar-ligth" style={{backgroundColor: '#e3f2fd'}}>
          <NavbarBrand href="/" className="me-auto" style={{color: '#06385C'}}>
            Menu
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="" style={{color: '#06385C'}}>Wallets</NavLink>
              </NavItem>
              <hr />
              <NavItem>
                <NavLink href="" style={{color: '#06385C'}}>
                  Certificates
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }

  export { NavBar };