import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./Home";
import RoomTypes from "./RoomTypes";
import Booking from "./Booking";
import Layout from "./Layout";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/rooms" element={<RoomTypes />} />
          <Route path="/booking/:roomId" element={<Booking />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;