const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
cors({
origin: [
'http://localhost:5173',
'https://mj21jasim.github.io',
],
})
);

app.use(express.json());

// Demo login credentials
const mockUser = {
email: '[gamer@example.com](mailto:gamer@example.com)',
password: '123456',
};

// Check whether the API is running
app.get('/', (_req, res) => {
res.send('PIXORA Login API is running!');
});

// Login API
app.post('/api/login', (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
return res.status(400).json({
success: false,
message: 'Please enter your email and password.',
});
}

const emailMatches =
email.trim().toLowerCase() === mockUser.email;

const passwordMatches = password === mockUser.password;

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
console.log(`PIXORA server running on port ${PORT}`);
});
