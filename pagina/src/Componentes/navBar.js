import react, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './navBar.css';
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
        <Navbar color="faded" light className="navbar navbar-ligth" style={{backgroundColor: '#22266B'}}>
          <NavbarBrand href="/" className="me-auto" style={{color: '#FFFFFF'}}>
            Menu
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" style={{backgroundColor: '#FFFFFF'}}/>
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar >
              <NavItem >
                <NavLink className='links' href="">Wallets</NavLink>
              </NavItem>
              <hr style={{color: 'white'}}/>
              <NavItem>
                <NavLink className='links' href="">
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