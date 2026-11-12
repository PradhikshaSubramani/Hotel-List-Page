import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Notification from './components/Notification';
import HotelList from './pages/HotelList';
import HotelFormPage from './pages/HotelFormPage';
import HotelDetails from './pages/HotelDetails';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HotelList />} />
            <Route path="/add" element={<HotelFormPage />} />
            <Route path="/edit/:id" element={<HotelFormPage />} />
            <Route path="/hotels/:id" element={<HotelDetails />} />
          </Routes>
        </div>
        <Footer />
        <Notification />
      </div>
    </Router>
  );
}

export default App;