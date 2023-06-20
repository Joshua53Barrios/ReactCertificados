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
          <NavbarBrand href="/" className="me-auto" style={{color: '#D9E9F3'}}>
            Menu
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="">Wallets</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="">
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