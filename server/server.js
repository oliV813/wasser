const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;


// Middleware
// Ohne Parameter: Erlaubt alle Domains
app.use(express.json());
app.use(cors());


// Datenbank verbindung
const { Pool } = require('pg');
require('dotenv').config();

// Verbindungspool erstellen (für bessere Performance)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Wichtig für Neon DB!
    }
});

app.get('/', (req, res) => {
    res.send("Hallo Backend")
})

app.post('/submit', async (req, res) => {
    console.log(req.body)
    const amount = req.body.count

    try {

        const currentDate = new Date().toISOString().split('T')[0]; // Format: "YYYY-MM-DD"

        const query = await pool.query('INSERT INTO wasser (amount, eDate) VALUES ($1, $2) RETURNING *', [amount, currentDate])
        res.status(200).json({ message: "Upgedatet" })

    }

    catch (err) {
        res.status(401).json({ message: err })
    }
})

app.get('/today', async (req,res) => {
    try {
        
        const date = new Date().toISOString().split("T")[0]
        const query = await pool.query('SELECT * FROM wasser WHERE edate = $1', [date])
        console.log(query.rows)
        res.status(200).json(query.rows)

    }

    catch (err) {
        console.log(err)
        res.status(401).json({message: "Fehler: ", err})

    }
})

app.get('/all', async (req, res) => {


    const query = await pool.query("SELECT * FROM wasser")
    if (query.rows.length > 0) {
        res.status(200).json(query.rows)
    }

    else {
        res.status(401).json({message: 'Keine Daten gefunden'})
    }

})



// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
