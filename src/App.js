
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Switch, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/Signup';
import OtpValidation from './components/OtpValidation';
import Login from './components/Login';
import FoodDetails from './components/FoodDetail';
import DeliveryBoySignup from './components/DeliveryBoySignup';
import UpdateTransaction from './components/UpdateTransaction';
import MyOrders from './components/MyOrders';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<><Home /></>}></Route>
          <Route path='/signup' element={<><Signup /></>}></Route>
          <Route path='/validateotp/:id' element={<><OtpValidation /></>}></Route>
          <Route path='/login' element={<><Login /></>}></Route>
          <Route path='/details/:id' element={<><FoodDetails /></>}></Route>
          <Route path='/deliveryboysignup' element={<><DeliveryBoySignup /></>}></Route>
          <Route path='/updatetransaction/:id' element={<><UpdateTransaction /></>}></Route>
          <Route path='/orders' element={<><MyOrders /></>}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
