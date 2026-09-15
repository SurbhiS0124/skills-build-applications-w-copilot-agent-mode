import { useState, useEffect } from 'react'
import { fetchData } from '../api'

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // API endpoint with Codespaces support
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
    : 'http://localhost:8000/api/leaderboard'

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        const data = await fetchData(apiEndpoint)
        setLeaderboard(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadLeaderboard()
  }, [])

  if (loading) return <div className="leaderboard-container"><p>Loading leaderboard...</p></div>
  if (error) return <div className="leaderboard-container"><p className="error">Error: {error}</p></div>

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      {leaderboard.length === 0 ? (
        <p>No leaderboard data found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>User Name</th>
              <th>Points</th>
              <th>Activities</th>
              <th>Total Distance (km)</th>
              <th>Total Calories</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id || index}>
                <td>{index + 1}</td>
                <td>{entry.userName}</td>
                <td>{entry.points}</td>
                <td>{entry.activities}</td>
                <td>{entry.totalDistance}</td>
                <td>{entry.totalCalories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
