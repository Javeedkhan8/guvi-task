import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleList from './components/VehicleList';
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


function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
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
          </Routes>
        </div>
      </Router>
  );
}

export default App;
