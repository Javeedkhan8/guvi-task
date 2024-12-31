import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleList from './components/VehicleList';
<<<<<<< HEAD
import BookingForm from './components/BookingForm';
import UserBookings from './components/UserBookings';
import PayPalPaymentButton from './components/PayPalPaymentButton';
import PaymentSuccess from './components/PaymentSuccess';
import RentalReport from './components/RentalReport';
import RentalHistory from './components/RentalHistory';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Review from './components/Review';
import UserProfile from './components/UserProfile';
import Home from './pages/Home';
=======
import VehicleDetails from './components/VehicleDetails';
import Register from './components/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Registers from './components/Registers';import BookingForm from './components/BookingForm';
>>>>>>> d98f03bd2c26482d7aa5c4510ef50d7d7954ad4e


function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
<<<<<<< HEAD
          <Route path="/vehiclelist" element={<VehicleList/>} />
          <Route path ="/" element = {<Home/>} />
            <Route path = "/book/:vehicleId" element = {<BookingForm />} />
            <Route path = "/user/bookings/:userId" element = {<UserBookings />} />
            <Route path = "/paymentbutton" element ={<PayPalPaymentButton/>}/>
            <Route path = "/paymentsucess" element = {<PaymentSuccess/>}/>
            <Route path = "/rentalreport" element = {<RentalReport/>}/>
            <Route path = "/rental-history/:vehicleId/:userId" element = {<RentalHistory/>}/>
            <Route path = "/register" element ={<Register/>}/>
            <Route path = "/login" element = {<Login/>}/>
            <Route path = "/dashboard" element = {<Dashboard/>}/>
            <Route path = "/review/:vehicleId" element = {<Review/>}/>
            <Route path = "/profile/:userId" element = {<UserProfile/>}/>
=======
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Register />} />
            <Route path="/register" element={<Registers />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles" element={<VehicleList />} />
            <Route path="/bookings" element={<BookingForm/>}/>
            <Route path="/vehicle/:id" element={<VehicleDetails />} />
>>>>>>> d98f03bd2c26482d7aa5c4510ef50d7d7954ad4e
          </Routes>
        </div>
      </Router>
  );
}

export default App;
