const express = require('express'); //importiert Espress-Framework zum Erstellen des Webservers
const cors = require('cors'); //erlaubt Frontend fragen an Backend zu schicken
const routes = require('./routes'); // für GET, POST; DELETE
const mongoose = require('mongoose'); //für Verbindung und Arbeit mit MongoDB
require('dotenv').config();
const path = require('path'); //Dateipfade

const app = express(); //erstellt neue Express-App
const PORT = 3000;

app.use(express.json());
// enable cors for all requests
app.use(cors());
app.use('/api', routes);

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });
const db = mongoose.connection; //Verbindungsobjekte zur Datenbank

//Wenn Fehler in Konsole angezeigt
db.on('error', err => {
  console.log(err);
});

//wenn Verbindung erfolgreich
db.once('open', () => {
    console.log('connected to DB');
});

//Startet Server auf Port 3000
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});