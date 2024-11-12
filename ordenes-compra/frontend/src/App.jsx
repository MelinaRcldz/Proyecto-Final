
// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductosPage from './pages/ProductosPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> {/* Ruta principal */}
                <Route path="/productos" element={<ProductosPage />} />
                {/* Puedes añadir más rutas aquí para otras páginas */}
            </Routes>
        </Router>
    );
}

export default App;



