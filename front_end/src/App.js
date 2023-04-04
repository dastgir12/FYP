import React from "react";
import Home from "./container/Home";
import DashBoardPage from './dashboard/DashBoardPage'
import Login from "./Form/Login";
import Register from "./Form/Register";
// import DashBoard from './dashboard'
// import HotelAdd from './dashboard/hotel/HotelAdd'
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <>

      <BrowserRouter>


        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<DashBoardPage />}>
            {/* <Route index element={<DashBoard />} /> */}
            {/* <Route path="/dashboard/hoteladd" element={<HotelAdd />} /> */}
            {/* <Route
              path="/dashboard/paymentmethod"
              element={<PaymentMethod />}
            />
            <Route path="/dashboard/roomadd" element={<RoomAdd />} />
            <Route path="/dashboard/hotellist" element={<HotelList />} />
            <Route path="/dashboard/roomlist" element={<RoomList />} />
            <Route path="/dashboard/addresidence" element={<ResidenceAdd />} />
            <Route
              path="/dashboard/residencelist"
              element={<ResidenceList />}
            />
            <Route path="/dashboard/booking" element={<Booking />} />
            <Route path="/dashboard/approved" element={<ApprovedRequest />} /> */}
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
