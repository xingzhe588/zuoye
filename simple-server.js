const express = require('express');
const app = express();
const port = 3002;

console.log('Starting server...');

// Enable CORS
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

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/health', (req, res) => {
  console.log('Health check requested');
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Login endpoint (with and without trailing slash)
const handleLogin = (req, res) => {
  console.log('Login request:', req.body);
  const { username, password } = req.body;

  if (username === 'demo' && password === 'demo') {
    console.log('Login successful');
    res.json({
      data: {
        user: {
          id: 1,
          username: 'demo',
          email: 'demo@example.com',
          firstName: 'Demo',
          lastName: 'User'
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token'
      },
      _links: {
        self: { href: '/api/auth/login', rel: 'self' },
        profile: { href: '/api/users/1', rel: 'profile' }
      }
    });
  } else {
    console.log('Login failed - invalid credentials');
    res.status(401).json({
      error: 'Invalid credentials',
      _links: {
        self: { href: '/api/auth/login', rel: 'self' }
      }
    });
  }
};

app.post('/api/auth/login', handleLogin);
app.post('/api/auth/login/', handleLogin);

// Register endpoint (with and without trailing slash)
const handleRegister = (req, res) => {
  console.log('Register request:', req.body);
  const { username, email, password, confirm_password, first_name, last_name } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    console.log('Registration failed - missing required fields');
    return res.status(400).json({
      error: 'Missing required fields: username, email, password',
      _links: {
        self: { href: '/api/auth/register', rel: 'self' }
      }
    });
  }

  if (password !== confirm_password) {
    console.log('Registration failed - password mismatch');
    return res.status(400).json({
      error: 'Password confirmation does not match',
      _links: {
        self: { href: '/api/auth/register', rel: 'self' }
      }
    });
  }

  console.log('Registration successful');
  res.status(201).json({
    data: {
      user: {
        id: 2,
        username,
        email,
        firstName: first_name || '',
        lastName: last_name || ''
      },
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token'
    },
    _links: {
      self: { href: '/api/auth/register', rel: 'self' },
      profile: { href: '/api/users/2', rel: 'profile' },
      login: { href: '/api/auth/login', rel: 'login' }
    }
  });
};

app.post('/api/auth/register', handleRegister);
app.post('/api/auth/register/', handleRegister);

// Logout endpoint
const handleLogout = (req, res) => {
  console.log('Logout request');
  res.json({
    data: null,
    _links: {
      self: { href: '/api/auth/logout', rel: 'self' },
      login: { href: '/api/auth/login', rel: 'login' }
    }
  });
};

app.post('/api/auth/logout', handleLogout);
app.post('/api/auth/logout/', handleLogout);

// Current user endpoint
const handleCurrentUser = (req, res) => {
  console.log('Current user request');
  res.json({
    data: {
      id: 1,
      username: 'demo',
      email: 'demo@example.com',
      firstName: 'Demo',
      lastName: 'User'
    },
    _links: {
      self: { href: '/api/auth/me', rel: 'self' },
      profile: { href: '/api/users/1', rel: 'profile' }
    }
  });
};

app.get('/api/auth/me', handleCurrentUser);
app.get('/api/auth/me/', handleCurrentUser);

// Artworks endpoint
app.get('/api/artworks', (req, res) => {
  console.log('Artworks requested');
  res.json({
    data: [
      {
        id: 1,
        title: 'Digital Art 1',
        artist: 'Artist 1',
        imageUrl: 'https://via.placeholder.com/300x300',
        description: 'Beautiful digital artwork'
      }
    ],
    _links: {
      self: { href: '/api/artworks', rel: 'self' }
    }
  });
});

app.listen(port, () => {
  console.log(`🚀 Simple API server running at http://localhost:${port}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   POST /api/auth/login[/]`);
  console.log(`   POST /api/auth/register[/]`);
  console.log(`   POST /api/auth/logout[/]`);
  console.log(`   GET  /api/auth/me[/]`);
  console.log(`   GET  /api/artworks[/]`);
  console.log(`💡 Demo credentials: username=demo, password=demo`);
  console.log(`✅ Server ready for frontend connections!`);
});

console.log('Server script loaded');
