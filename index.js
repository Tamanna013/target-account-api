const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const { users, companies } = require('./data');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Parsing incoming requests as JSON

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Username:', username);
  console.log('Password:', password);

  // Find user by username
  const user = users.find(u => u.username === username);
  console.log('Welcome ', user);

  if (!user) {
    console.log('User not found');
    return res.status(400).json({ message: 'User not found' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    console.log('Invalid credentials');
    return res.status(403).json({ message: 'Invalid credentials' });
  }
  
  // Generating a token upon successful login
  const token = jwt.sign({ username }, 'SECRET_KEY', { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

app.get('/accounts', authenticateToken, (req, res) => {
  res.json(companies);
});

// Update Company Status
app.post('/accounts/:id/status', authenticateToken, (req, res) => {
  const { status } = req.body;
  const company = companies.find(c => c.id == req.params.id);

  if (!company) return res.status(404).json({ message: 'Company not found' });

  company.accountStatus = status;
  res.json({ message: 'Status updated', company });
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
