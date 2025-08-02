const express = require('express');
const user = require('./Models/user');
const connection = require('./config/DB_practice');
const bcrypt = require('bcryptjs');
const app = express();
const cors = require('cors');
const session = require('express-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }
        await user.create({ name, email, password });
        res.send('Signup successful!');
        console.log('Signup:', req.body);
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).send('Error creating user');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        req.session.user = {
            id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name
        };

        console.log('Login successful:', req.session.user);
        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ❗️Remove app.listen for Vercel
module.exports = app;
