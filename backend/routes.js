const express = require('express');
const router = express.Router();
const Buch = require('./models/buch');


// get all books
router.get('/buch', async(req, res) => {
    const allBuch = await Buch.find();
    console.log(allBuch);
    res.send(allBuch);
});

module.exports = router;