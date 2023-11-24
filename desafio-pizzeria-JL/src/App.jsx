import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PizzaProvider } from './context/PizzaContext';
import Navbar from './components/Navbar'; 
import Home from './views/Home';
import Carrito from './views/Carrito';
import DetallesPizza from './views/DetallesPizza';
import NotFound from './views/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <PizzaProvider>
          <Navbar />  
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/home/:name" element={<DetallesPizza />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PizzaProvider>
      </Router>
      <ToastContainer />
    </div>
  );
}
