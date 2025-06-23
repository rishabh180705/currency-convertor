import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import   Home  from './components/home.jsx'
import HistoricalChart from './components/historical_data.jsx'
import HistoricalRates from './components/currencyValue.jsx'
import AboutUs from './components/AboutUs.jsx'
function App() {
 
  return (
    <Router>
    <Routes>
      <Route path="/historical" element={<HistoricalChart/>} />
      <Route path="/" element={<Home />} />
      <Route path="/historical-rates" element={<HistoricalRates />} />
      <Route path="/about" element={<AboutUs />} />
      {/* Add more routes as needed */}
    </Routes>
    </Router>
  )
}

export default App
