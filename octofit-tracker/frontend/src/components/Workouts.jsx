import { useState, useEffect } from 'react'
import { API_ENDPOINTS, fetchData } from '../api'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true)
        const data = await fetchData(API_ENDPOINTS.workouts)
        setWorkouts(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadWorkouts()
  }, [])

  if (loading) return <div className="workouts-container"><p>Loading workouts...</p></div>
  if (error) return <div className="workouts-container"><p className="error">Error: {error}</p></div>

  return (
    <div className="workouts-container">
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Intensity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{workout.id}</td>
                <td>{workout.name}</td>
                <td>{workout.type}</td>
                <td>{workout.duration}</td>
                <td>{workout.intensity}</td>
                <td>{workout.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
