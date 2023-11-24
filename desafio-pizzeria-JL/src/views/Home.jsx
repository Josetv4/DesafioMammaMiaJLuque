import React, { useEffect, useState } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usePizzaContext } from '../context/PizzaContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const { agregarAlCarrito } = usePizzaContext();
    const [pizzas, setPizzas] = useState([]);
    const [clickedButtons, setClickedButtons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/pizzas.json')
            .then((response) => response.json())
            .then((data) => {
                setPizzas(data);
            })
            .catch((error) => {
                console.error('Error al cargar la información de la pizza ', error);
            });
    }, []);

    const verDetalles = (name) => {
        navigate(`/home/${name}`);
    };

    const handleAddToCart = (pizza) => {
        agregarAlCarrito(pizza);
        setClickedButtons([...clickedButtons, pizza.id]);

        // Instale toastify para mostrar notificaciones 
        toast.success(`Pizza ${pizza.name} añadida al carrito, Verifica tu pedido en carrito de compra`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    const isButtonClicked = (pizza) => clickedButtons.includes(pizza.id);

    return (
        <div className="logo">
            <div className="texLogo">
                <h1>¡Pizzería Mamma Mia!</h1>
                <p className='tracking-in-expand text-Tittle1'>¡Tenemos las mejores pizzas que podrás encontrar!</p>
                <hr />
            </div>
            <div className="row p-3 cards">
                {pizzas.map((pizza) => (
                    <div key={pizza.id} className="col-md-3 mb-3">
                        <Card style={{ width: '80%' }}>
                            <CardImg variant="top" src={pizza.img} />
                            <CardBody>
                                <CardTitle as="h3" style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                                    {pizza.name}
                                </CardTitle>
                                <CardText>
                                    <strong>Ingredientes:</strong>
                                    <ul className="list-unstyled" style={{ fontSize: '0.9em', padding: '0' }}>
                                        {pizza.ingredients.map((ingredient, index) => (
                                            <li
                                                key={index}
                                                style={{
                                                    border: '1px solid #ccc',
                                                    padding: '5px',
                                                    borderRadius: '5px',
                                                    marginBottom: '5px',
                                                }}
                                            >
                                                🍕 {ingredient}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="h4 mb-0">Precio: ${pizza.price}</div>
                                </CardText>
                                <div className="d-flex justify-content-between">
                                    <Button
                                        variant="primary"
                                        onClick={() => verDetalles(pizza.name)}
                                    >
                                        Ver más 👁️
                                    </Button>
                                    <Button
                                        variant={isButtonClicked(pizza) ? 'success' : 'danger'}
                                        onClick={() => handleAddToCart(pizza)}
                                    >
                                        Añadir 🛒
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
