import React, { useEffect, useState, useRef } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import ActuationPage from './pages/ActuationPage';
import Dashboard from './pages/Dashboard';
// import { MapContainer, TileLayer, Polyline, Marker, Popup, Polygon, Rectangle } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import CustomCircleMarker from './components/CustomCircleMarker';
// import { IoIosWater } from 'react-icons/io';
// import { BsFillBoxFill } from "react-icons/bs";
// import L from 'leaflet';
// import ReactDOMServer from 'react-dom/server';
import {Routes, Route} from "react-router-dom";
// import Swal from 'sweetalert2';
// import axios from 'axios';
import './App.css';
import SimulationPage from './pages/SimulationPage';
import ThreeD from './pages/ThreeD';

function App(){
  return (
    <>
    <Routes>
      <Route path='/dt_waternetwork/test' element={<Dashboard />} />
      <Route path='/dt_waternetwork/test/simulation' element={<SimulationPage />} />
      <Route path='/dt_waternetwork/test/actuation' element={<ActuationPage/>} />
      <Route path='/dt_waternetwork/test/3d'element={<ThreeD />}/>
    </Routes>
    </>
  )
}

export default App;