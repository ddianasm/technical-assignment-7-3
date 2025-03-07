import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { MealsPage } from './pages/MealsPage';
import { MealPage } from './pages/MealPage';
import { SelectedMeals } from './pages/SelectedMeals';


function App() {
  return (
    <Router>
      <div className="flex flex-row gap-2">
        <Link to="/">List</Link>
        <Link to="/meals/selected">Selected</Link>
      </div>
      <Routes>
        <Route path="/" element={<MealsPage />} />
        <Route path="/meal/:id" element={<MealPage />} />
        <Route path="/meals/selected" element={<SelectedMeals />} />
      </Routes>
    </Router>
  )
}

export default App
