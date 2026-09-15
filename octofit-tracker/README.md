# OctoFit Tracker

A modern multi-tier fitness tracking application built with React 19, Express.js, and MongoDB.

## Architecture

```
octofit-tracker/
├── frontend/          # React 19 + Vite SPA (Port 5173)
├── backend/           # Express.js + TypeScript API (Port 8000)
└── docker-compose.yml # MongoDB container (Port 27017)
```

## Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **Port**: 5173

### Setup
```bash
cd frontend
npm install
npm run dev
```

## Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Port**: 8000

### Setup
```bash
cd backend
npm install
npm run dev
```

## Database

- **Database**: MongoDB
- **Port**: 27017
- **Connection String**: `mongodb://localhost:27017/octofit-tracker`

### Prerequisites
Ensure MongoDB is running locally or via Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Configuration Summary

| Service | Port | Technology |
|---------|------|------------|
| Frontend | 5173 | React 19 + Vite |
| Backend | 8000 | Express.js + TypeScript |
| Database | 27017 | MongoDB |
