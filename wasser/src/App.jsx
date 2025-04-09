import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Today from './Today';
import Total from './Total';
import Nav from './Nav';

function App() {

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/total" element={<Total />} />
      </Routes>
      <Nav />
    </Router>
  )
}

export default App
