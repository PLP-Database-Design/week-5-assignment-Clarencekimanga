const express = require('express');
const mysql2 = require('mysql2');
require('dotenv').config();

const app = express();

// Database connection 
const db = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Test the connection
db.connect((err) => {
    if(err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Database Connected successfully');
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Hospital API');
});

// Question 1: Retrieving all patients
app.get('/patients', (req, res) => {
    const query = 'SELECT * FROM patients';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Question 2: Retrieving all providers
app.get('/providers', (req, res) => {
    const query = 'SELECT * FROM providers';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Question 3: Filter patients by First_name
app.get('/patients/search', (req, res) => {
    const { first_name } = req.query;
    const query = 'SELECT * FROM patients WHERE first_name = ?';
    db.query(query, [first_name], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Question 4: Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
    const { speciality } = req.query;
    const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
    db.query(query, [speciality], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Listening to the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
