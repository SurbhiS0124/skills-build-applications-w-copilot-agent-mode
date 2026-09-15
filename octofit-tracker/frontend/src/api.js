// API Configuration with Codespaces support
const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }
  
  // Fallback to localhost
  return 'http://localhost:8000/api'
}

export const API_BASE_URL = getApiBaseUrl()

export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/users`,
  activities: `${API_BASE_URL}/activities`,
  teams: `${API_BASE_URL}/teams`,
  workouts: `${API_BASE_URL}/workouts`,
  leaderboard: `${API_BASE_URL}/leaderboard`,
}

export const fetchData = async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    
    // Handle both paginated and array responses
    if (data.users) return data.users
    if (data.activities) return data.activities
    if (data.teams) return data.teams
    if (data.workouts) return data.workouts
    if (data.leaderboard) return data.leaderboard
    
    // Return array directly if it's an array
    if (Array.isArray(data)) return data
    
    return data
  } catch (error) {
    console.error('API fetch error:', error)
    throw error
  }
}
