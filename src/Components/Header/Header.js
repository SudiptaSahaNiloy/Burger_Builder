import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import '../../Stylesheet/Header.css';
import Logo from '../../assets/Images/logo.png';

const Header = (props) => {
    return (
        <div>
            <Navbar className="Navigation" style={{
                backgroundColor: "#D70F64",
                height: "70px",
            }}>
                <NavbarBrand href="/" className="me-5 Brand ms-md-5">
                    <img src={Logo} alt="Logo" width="80px" />
                </NavbarBrand>
                <Nav className="me-md-5">
                    <NavItem>
                        <NavLink href="#" className="navlink">Something</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}

export default Header;