import express, { Express, Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app: Express = express()
const PORT = 8000
const MONGODB_URI = 'mongodb://localhost:27017/octofit-tracker'

// Environment detection for Codespaces
const CODESPACE_NAME = process.env.CODESPACE_NAME
const isCodespace = !!CODESPACE_NAME
const API_BASE_URL = isCodespace 
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

// Middleware
app.use(express.json())
app.use(cors({
  origin: [
    `http://localhost:3000`,
    `http://localhost:5173`,
    isCodespace ? `https://${CODESPACE_NAME}-5173.app.github.dev` : undefined,
    API_BASE_URL
  ].filter(Boolean),
  credentials: true
}))

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB at mongodb://localhost:27017/octofit-tracker')
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
  })

// API Routes

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'OctoFit Tracker API',
    version: '1.0.0',
    apiBaseUrl: API_BASE_URL,
    environment: isCodespace ? 'codespace' : 'localhost'
  })
})

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: isCodespace ? 'codespace' : 'localhost'
  })
})

// Users API endpoints
app.get('/api/users', (req: Request, res: Response) => {
  res.json({
    message: 'Users API',
    endpoint: '/api/users',
    method: 'GET',
    description: 'Retrieve all users',
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
    ]
  })
})

app.post('/api/users', (req: Request, res: Response) => {
  const { name, email, role } = req.body
  
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required',
      example: { name: 'John Doe', email: 'john@example.com', role: 'user' }
    })
  }

  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: 4,
      name,
      email,
      role: role || 'user',
      createdAt: new Date().toISOString()
    }
  })
})

// Activities API endpoints
app.get('/api/activities', (req: Request, res: Response) => {
  res.json({
    message: 'Activities API',
    endpoint: '/api/activities',
    method: 'GET',
    description: 'Retrieve all fitness activities',
    activities: [
      { 
        id: 1, 
        userId: 1, 
        type: 'Running', 
        distance: 5.2, 
        duration: 32, 
        date: '2024-01-15',
        calories: 450
      },
      { 
        id: 2, 
        userId: 1, 
        type: 'Cycling', 
        distance: 15.8, 
        duration: 45, 
        date: '2024-01-14',
        calories: 520
      },
      { 
        id: 3, 
        userId: 2, 
        type: 'Swimming', 
        distance: 2.0, 
        duration: 30, 
        date: '2024-01-15',
        calories: 380
      }
    ]
  })
})

app.post('/api/activities', (req: Request, res: Response) => {
  const { userId, type, distance, duration, date, calories } = req.body
  
  if (!userId || !type || !distance || !duration) {
    return res.status(400).json({
      error: 'userId, type, distance, and duration are required',
      example: {
        userId: 1,
        type: 'Running',
        distance: 5.2,
        duration: 32,
        date: '2024-01-15',
        calories: 450
      }
    })
  }

  res.status(201).json({
    message: 'Activity recorded successfully',
    activity: {
      id: 4,
      userId,
      type,
      distance,
      duration,
      date: date || new Date().toISOString().split('T')[0],
      calories: calories || Math.round(distance * 100),
      createdAt: new Date().toISOString()
    }
  })
})

// Configuration endpoint
app.get('/api/config', (req: Request, res: Response) => {
  res.json({
    apiBaseUrl: API_BASE_URL,
    environment: isCodespace ? 'codespace' : 'localhost',
    port: PORT,
    mongoUri: MONGODB_URI,
    codespaceEnabled: isCodespace,
    codespaceDevDomain: isCodespace ? `${CODESPACE_NAME}.app.github.dev` : null
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 OctoFit Tracker Backend Started`)
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
  console.log(`📡 Server running on port ${PORT}`)
  console.log(`🌍 API Base URL: ${API_BASE_URL}`)
  console.log(`📍 Environment: ${isCodespace ? 'GitHub Codespace' : 'Localhost'}`)
  console.log(`\n📚 Available Endpoints:`)
  console.log(`   GET  /                  - API info`)
  console.log(`   GET  /health            - Health check`)
  console.log(`   GET  /api/config        - Configuration`)
  console.log(`   GET  /api/users         - List all users`)
  console.log(`   POST /api/users         - Create new user`)
  console.log(`   GET  /api/activities    - List all activities`)
  console.log(`   POST /api/activities    - Record new activity`)
  console.log(`\n💡 Test with curl:`)
  if (isCodespace) {
    console.log(`   curl https://${CODESPACE_NAME}-8000.app.github.dev/api/users`)
    console.log(`   curl https://${CODESPACE_NAME}-8000.app.github.dev/api/activities`)
  } else {
    console.log(`   curl http://localhost:8000/api/users`)
    console.log(`   curl http://localhost:8000/api/activities`)
  }
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`)
})
