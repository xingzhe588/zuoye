const express = require('express');
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(express.json());

// Mock API endpoints
app.get('/api/artworks', (req, res) => {
  res.json({
    data: [
      {
        id: 1,
        title: 'Digital Art 1',
        artist: 'Artist 1',
        imageUrl: 'https://via.placeholder.com/300x300',
        description: 'Beautiful digital artwork',
        tags: ['digital', 'art', 'modern']
      },
      {
        id: 2,
        title: 'Digital Art 2', 
        artist: 'Artist 2',
        imageUrl: 'https://via.placeholder.com/300x300',
        description: 'Amazing digital creation',
        tags: ['digital', 'creative', 'art']
      }
    ],
    _links: {
      self: { href: '/api/artworks', rel: 'self' },
      next: { href: '/api/artworks?page=2', rel: 'next' }
    }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'demo' && password === 'demo') {
    res.json({
      data: {
        user: {
          id: 1,
          username: 'demo',
          email: 'demo@example.com',
          firstName: 'Demo',
          lastName: 'User'
        },
        token: 'mock-jwt-token'
      },
      _links: {
        self: { href: '/api/auth/login', rel: 'self' },
        profile: { href: '/api/users/1', rel: 'profile' }
      }
    });
  } else {
    res.status(401).json({
      error: 'Invalid credentials',
      _links: {
        self: { href: '/api/auth/login', rel: 'self' }
      }
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { username, email, firstName, lastName } = req.body;
  
  res.json({
    data: {
      user: {
        id: 2,
        username,
        email,
        firstName,
        lastName
      },
      token: 'mock-jwt-token'
    },
    _links: {
      self: { href: '/api/auth/register', rel: 'self' },
      profile: { href: '/api/users/2', rel: 'profile' }
    }
  });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  
  res.json({
    data: {
      id: parseInt(id),
      username: 'demo',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User',
      artworks: []
    },
    _links: {
      self: { href: `/api/users/${id}`, rel: 'self' },
      artworks: { href: `/api/users/${id}/artworks`, rel: 'artworks' }
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  next();
});

app.listen(port, () => {
  console.log(`🚀 Mock API server running at http://localhost:${port}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /api/artworks`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/auth/register`);
  console.log(`   GET  /api/users/:id`);
  console.log(`   GET  /health`);
  console.log(`\n💡 Demo credentials: username=demo, password=demo`);
});
