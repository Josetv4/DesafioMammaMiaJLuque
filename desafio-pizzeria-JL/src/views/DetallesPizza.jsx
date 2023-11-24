import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePizzaContext } from '../context/PizzaContext';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DetallesPizza() {
    const { name } = useParams();
    const { pizzas, agregarAlCarrito } = usePizzaContext();
    const [pizzaSeleccionada, setPizzaSeleccionada] = useState(null);

    useEffect(() => {
        const pizzaEncontrada = pizzas.find((pizza) => pizza.name === name);
        setPizzaSeleccionada(pizzaEncontrada);
    }, [name, pizzas]);

    if (!pizzaSeleccionada) {
        return <p>No se encontró la pizza</p>;
    }

    const handleAñadirCarrito = () => {
        agregarAlCarrito(pizzaSeleccionada);

        // Mostrar notificación
        toast.success(`Pizza ${pizzaSeleccionada.name} añadida al carrito, Verifica tu pedido en carrito de compra`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        });
    };

    return (
        <div>
            <h1 className="text-Tittle tracking-in-expand ">
                Una descripción que no podrás resistir, ¡Compra ya! 🍕
            </h1>
            <Card>
                <Row>
                    <Col md={4}>
                        <Card.Img src={pizzaSeleccionada.img} alt={pizzaSeleccionada.name} />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className='text-Tittle2' >{pizzaSeleccionada.name}</Card.Title>
                            <Card.Text>{pizzaSeleccionada.desc}</Card.Text>
                            <Card.Text>
                                Ingredientes:
                                <ul className="list-unstyled">
                                    {pizzaSeleccionada.ingredients.map((ingredient, index) => (
                                        <li key={index}> 🍕 {ingredient}</li>
                                    ))}
                                </ul>
                            </Card.Text>
                            <Card.Text>Precio: ${pizzaSeleccionada.price}</Card.Text>
                            <Button onClick={handleAñadirCarrito}>
                                Añadir 🛒
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

