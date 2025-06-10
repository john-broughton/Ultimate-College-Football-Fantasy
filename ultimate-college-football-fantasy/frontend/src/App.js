import { Analytics } from "@vercel/analytics/react"
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage.js";
import DraftPage from "./pages/DraftPage.js";
import RosterPage from "./pages/RosterPage.js";
import WeekSummaryPage from "./pages/WeekSummaryPage.js";
import TransactionsPage from "./pages/TransactionsPage.js";
import PlayerOverviewPage from "./pages/PlayerOverviewPage.js";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div>
        <nav className="bg-blue-700 text-white px-4 py-3 shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">🏈 UCF Fantasy</h1>

            {/* Hamburger (Mobile) */}
            <button
              className="sm:hidden text-white focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              ☰
            </button>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-4 text-sm sm:text-base">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/draft" className="hover:underline">Draft</Link>
              <Link to="/roster" className="hover:underline">Roster</Link>
              <Link to="/summary" className="hover:underline">Week Summary</Link>
              <Link to="/transactions" className="hover:underline">Transactions</Link>
              <Link to="/players/Alice" className="hover:underline">Player Overview</Link>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="sm:hidden mt-2 space-y-2 text-sm px-2">
              <Link to="/" className="block hover:underline" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/draft" className="block hover:underline" onClick={() => setMenuOpen(false)}>Draft</Link>
              <Link to="/roster" className="block hover:underline" onClick={() => setMenuOpen(false)}>Roster</Link>
              <Link to="/summary" className="block hover:underline" onClick={() => setMenuOpen(false)}>Week Summary</Link>
              <Link to="/transactions" className="block hover:underline" onClick={() => setMenuOpen(false)}>Transactions</Link>
              <Link to="/players/Alice" className="block hover:underline" onClick={() => setMenuOpen(false)}>Player Overview</Link>
            </div>
          )}
        </nav>

        <main className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/draft" element={<DraftPage />} />
            <Route path="/roster" element={<RosterPage />} />
            <Route path="/summary" element={<WeekSummaryPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/players/:playerName" element={<PlayerOverviewPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
