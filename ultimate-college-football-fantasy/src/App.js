import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav style={{ marginBottom: "1rem" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/picks">Picks</Link> |{" "}
        <Link to="/rankings">Rankings</Link> |{" "}
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/picks" element={<Picks />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Welcome to Ultimate College Fantasy</h2>;
}

function Picks() {
  return <h2>Pick your teams for the week</h2>;
}

function Rankings() {
  return <h2>See the current leaderboard</h2>;
}

function Admin() {
  return <h2>Enter game results and update scores</h2>;
}

export default App;
