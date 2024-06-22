import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Flight from './Flight.jsx';
import Search from './Search.jsx';
import Add from './Add.jsx';
import Home from './Home.jsx';
import Hotel from './Hotel.jsx';
import Reservation from './Reservation.jsx';

const Main = () => {
  const [flights, setFlights] = useState([]);
  const [reservation, setReservation] = useState([]);
  const [query, setQuery] = useState({});
  const [ren, setRen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/api/flight/')
      .then((res) => {
        setFlights(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/api/flight/reservation')
      .then((res) => {
        setReservation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Flight flights={flights} />} />
        <Route path="/flight/add" element={<Add />} />
      </Routes>
    </Router>
  );
};

export default Main;
