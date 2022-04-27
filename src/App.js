import React from 'react';
import Home from './pages/Home';
import Batiment from './pages/Batiment';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/batiment/:idBat' element={<Batiment />} />
      </Routes>
    </Router>
  )
}

export default App;
