import React, { createContext, useState, useContext, useEffect } from 'react';

const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [pizzas, setPizzas] = useState([]);

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

    const agregarAlCarrito = (pizza) => {
        const pizzaExistente = carrito.find((p) => p.id === pizza.id);

        if (pizzaExistente) {
            const nuevoCarrito = carrito.map((p) =>
                p.id === pizza.id ? { ...p, cantidad: p.cantidad + 1 } : p
            );
            setCarrito(nuevoCarrito);
        } else {
            setCarrito([...carrito, { ...pizza, cantidad: 1 }]);
        }
    };

    const quitarDelCarrito = (pizzaId) => {
        const nuevoCarrito = carrito.map((p) =>
            p.id === pizzaId ? { ...p, cantidad: p.cantidad - 1 } : p
        );

        const carritoFiltrado = nuevoCarrito.filter((p) => p.cantidad > 0);
        setCarrito(carritoFiltrado);
    };

    const incrementarCantidad = (pizzaId) => {
        const nuevoCarrito = carrito.map((p) =>
            p.id === pizzaId ? { ...p, cantidad: p.cantidad + 1 } : p
        );
        setCarrito(nuevoCarrito);
    };

    const value = {
        carrito,
        pizzas,
        agregarAlCarrito,
        quitarDelCarrito,
        incrementarCantidad,
    };

    return (
        <PizzaContext.Provider value={value}>
            {children}
        </PizzaContext.Provider>
    );
};

export const usePizzaContext = () => {
    return useContext(PizzaContext);
};
