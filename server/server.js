const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Demo login credentials
const mockUser = {
  email: 'gamer@example.com',
  password: '123456',
};

// Check whether the API is running
app.get('/', (_req, res) => {
  res.send('PIXORA Login API is running!');
});

// Login API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  console.log('LOGIN REQUEST RECEIVED');
  console.log('Email:', email);
  console.log('Received email:', JSON.stringify(email));
  console.log('Received password:', JSON.stringify(password));

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please enter your email and password.',
    });
  }

  const emailMatches =
    email.trim().toLowerCase() === mockUser.email;

  const passwordMatches =
    password === mockUser.password;

  console.log('Email matches:', emailMatches);
  console.log('Password matches:', passwordMatches);

  if (emailMatches && passwordMatches) {
    return res.status(200).json({
      success: true,
      message: 'Login successful! Welcome to PIXORA.',
      user: {
        email: mockUser.email,
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid email or password.',
  });
});

app.listen(PORT, () => {
  console.log(`PIXORA server running at http://localhost:${PORT}`);
});

