import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>OctoFit Tracker</h1>
      <p>Modern fitness tracking application built with React 19 and Vite</p>
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
    </div>
  )
}

export default App
