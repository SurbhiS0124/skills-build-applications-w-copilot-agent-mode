import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { API_BASE_URL } from './api'
import Users from './components/Users'
import Activities from './components/Activities'
import Workouts from './components/Workouts'
import Teams from './components/Teams'
import Leaderboard from './components/Leaderboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>🏋️ OctoFit Tracker</h1>
          <p className="api-info">API Base: {API_BASE_URL}</p>
        </header>

        <nav className="app-nav">
          <Link to="/" className="nav-link">Dashboard</Link>
          <Link to="/users" className="nav-link">Users</Link>
          <Link to="/activities" className="nav-link">Activities</Link>
          <Link to="/workouts" className="nav-link">Workouts</Link>
          <Link to="/teams" className="nav-link">Teams</Link>
          <Link to="/leaderboard" className="nav-link">Leaderboard</Link>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>OctoFit Tracker © 2024 | React 19 + Vite | API on Port 8000</p>
        </footer>
      </div>
    </Router>
  )
}

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Welcome to OctoFit Tracker</h2>
      <p>A modern multi-tier fitness tracking application built with React 19 and Node.js Express API</p>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📊 Users</h3>
          <p>Manage and view all users in the system</p>
        </div>
        <div className="dashboard-card">
          <h3>🏃 Activities</h3>
          <p>Track fitness activities and workouts</p>
        </div>
        <div className="dashboard-card">
          <h3>💪 Workouts</h3>
          <p>Explore predefined workout routines</p>
        </div>
        <div className="dashboard-card">
          <h3>👥 Teams</h3>
          <p>Collaborate with team members</p>
        </div>
        <div className="dashboard-card">
          <h3>🏆 Leaderboard</h3>
          <p>Compete on the global leaderboard</p>
        </div>
        <div className="dashboard-card">
          <h3>⚙️ Config</h3>
          <p>Environment: {import.meta.env.VITE_CODESPACE_NAME ? 'Codespaces' : 'Localhost'}</p>
        </div>
      </div>
    </div>
  )
}

export default App
