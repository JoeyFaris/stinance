import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Investments from './pages/Investments';
import Header from './pages/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          {/* Add navigation here */}
        </header>
        <main>
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/investments" element={<Investments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;