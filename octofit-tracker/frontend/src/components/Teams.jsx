import { useState, useEffect } from 'react'
import { API_ENDPOINTS, fetchData } from '../api'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true)
        const data = await fetchData(API_ENDPOINTS.teams)
        setTeams(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadTeams()
  }, [])

  if (loading) return <div className="teams-container"><p>Loading teams...</p></div>
  if (error) return <div className="teams-container"><p className="error">Error: {error}</p></div>

  return (
    <div className="teams-container">
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Team Name</th>
              <th>Members</th>
              <th>Total Points</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.name}</td>
                <td>{team.members}</td>
                <td>{team.totalPoints}</td>
                <td>{team.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
