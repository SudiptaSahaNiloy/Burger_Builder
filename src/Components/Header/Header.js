import { Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';
import '../../Stylesheet/Header.css';
import Logo from '../../assets/Images/logo.png';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        token: state.token,
    }
}

const Header = (props) => {
    let links = null;

    if (props.token === null) {
        links = (
            <Nav className="me-md-5">
                <NavItem>
                    <NavLink
                        exact
                        to="/login"
                        className="navlink"
                        activeStyle={{ color: "wheat", textShadow: "1px 1px gray" }}>
                        Login
                    </NavLink>
                </NavItem>
            </Nav>

        )
    } else {
        links = (
            <Nav className="me-md-5">
                <NavItem>
                    <NavLink
                        exact
                        to="/"
                        className="navlink"
                        activeStyle={{ color: "wheat", textShadow: "1px 1px gray" }}>
                        Burger Builder
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        exact
                        to="/orders"
                        className="navlink"
                        activeStyle={{ color: "wheat", textShadow: "1px 1px gray" }}>
                        Orders
                    </NavLink>
                </NavItem>
            </Nav>
        )
    }

    return (
        <div>
            <Navbar className="Navigation">
                <NavbarBrand href="/" className="me-5 Brand ms-md-5">
                    <img src={Logo} alt="Logo" width="80px" />
                </NavbarBrand>
                {links}
            </Navbar>
        </div >
    )
}

export default connect(mapStateToProps)(Header);