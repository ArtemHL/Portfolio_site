import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Account from './pages/Account';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/account/*" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
