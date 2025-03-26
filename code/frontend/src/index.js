import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Login from './components/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Carousel from './components/Carousel';
import HomeLogin from './pages/HomeLogin';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
        <Router>
        <ChakraProvider>

            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/home" element={<HomeLogin/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/carousel" element={<Carousel/>}/>
            </Routes>
                  </ChakraProvider>

        </Router>
  </React.StrictMode>
);