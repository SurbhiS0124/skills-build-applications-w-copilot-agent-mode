import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 8000
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker'

// Middleware
app.use(express.json())

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB at port 27017')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API' })
})

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
