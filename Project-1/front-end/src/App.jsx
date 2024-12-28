import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleList from './components/VehicleList';
import VehicleDetails from './components/VehicleDetails';
import Register from './components/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Registers from './components/Registers';import BookingForm from './components/BookingForm';


function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Register />} />
            <Route path="/register" element={<Registers />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/bookings" element={<BookingForm/>}/>
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
