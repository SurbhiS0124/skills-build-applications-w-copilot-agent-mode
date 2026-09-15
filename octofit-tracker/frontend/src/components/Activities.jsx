import { useState, useEffect } from 'react'
import { fetchData } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // API endpoint with Codespaces support
  const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
    : 'http://localhost:8000/api/activities'

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        const data = await fetchData(apiEndpoint)
        setActivities(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadActivities()
  }, [])

  if (loading) return <div className="activities-container"><p>Loading activities...</p></div>
  if (error) return <div className="activities-container"><p className="error">Error: {error}</p></div>

  return (
    <div className="activities-container">
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Type</th>
              <th>Distance</th>
              <th>Duration (min)</th>
              <th>Date</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td>{activity.userId}</td>
                <td>{activity.type}</td>
                <td>{activity.distance} km</td>
                <td>{activity.duration}</td>
                <td>{activity.date}</td>
                <td>{activity.calories}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
