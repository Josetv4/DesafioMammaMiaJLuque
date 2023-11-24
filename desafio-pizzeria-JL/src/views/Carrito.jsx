import React from 'react';
import { ListGroup, Image, Button } from 'react-bootstrap';
import { usePizzaContext } from '../context/PizzaContext';

export default function Carrito() {
    const { carrito, quitarDelCarrito, incrementarCantidad } = usePizzaContext();

    const calcularPrecioTotal = () => {
        return carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
    };

    return (
        <div className="container-carrito">
            {carrito.length === 0 && (
                <div>
                    <h1 className="tracking-in-expand text-Tittle">No hay pizzas en el carrito 🍕</h1>
                </div>
            )}

            {carrito.length > 0 && (
                <ListGroup>
                    <div>
                        <h1 className="text-Tittle2 tracking-in-expand">Detalles del pedido</h1>
                    </div>
                    {carrito.map((item) => (
                        <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <Image
                                    src={item.img}
                                    alt={item.name}
                                    style={{ width: '50px', height: '50px', margin: '10px' }}
                                    rounded
                                />
                                <span className="ml-3">{item.name}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    className="mx-2"
                                    onClick={() => quitarDelCarrito(item.id)}
                                >
                                    -
                                </Button>
                                <span className="mx-2">{item.cantidad}</span>
                                <Button
                                    variant="outline-success"
                                    size="sm"
                                    className="mx-2"
                                    onClick={() => incrementarCantidad(item.id)}
                                >
                                    +
                                </Button>
                                <span>{item.price * item.cantidad}</span>
                            </div>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <div className="d-flex justify-content-between">
                            <span>Total:</span>
                            <span>${calcularPrecioTotal()}</span>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button variant="success" onClick={() => console.log('Ir a Pagar')}>
                            Ir a Pagar
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            )}
        </div>
    );
}

