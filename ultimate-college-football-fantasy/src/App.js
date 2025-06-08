import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DraftPage from './pages/DraftPage';
import RosterPage from './pages/RosterPage';
import WeekSummaryPage from './pages/WeekSummaryPage';
import TransactionsPage from './pages/TransactionsPage';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> |{" "}
          <Link to="/draft">Draft</Link> |{" "}
          <Link to="/roster">Roster</Link> |{" "}
          <Link to="/summary">Week Summary</Link> |{" "}
          <Link to="/transactions">Transactions</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/draft" element={<DraftPage />} />
          <Route path="/roster" element={<RosterPage />} />
          <Route path="/summary" element={<WeekSummaryPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
