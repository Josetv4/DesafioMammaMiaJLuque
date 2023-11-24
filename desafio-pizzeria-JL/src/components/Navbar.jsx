import { NavLink } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { usePizzaContext } from '../context/PizzaContext';

export default function CustomNavbar() {
    const setActiveClass = ({ isActive }) => (isActive ? "active" : undefined);
    const { carrito } = usePizzaContext();

    const precioTotal = carrito.reduce((total, pizza) => {
        return total + pizza.price * pizza.cantidad;
    }, 0)

    return (
        <Navbar className="custom-navbar">
            <Container>
                <Navbar.Brand>
                    <NavLink className={`nav-link ${setActiveClass}`} to="/">
                        🍕 Pizzeria Mamma Mia
                    </NavLink>
                </Navbar.Brand>
                <Nav>
                    <NavLink className={`nav-link ${setActiveClass}`} to="/carrito">
                    🛒 {precioTotal} $
                    </NavLink>
                </Nav>
            </Container>
        </Navbar>
    );
}
