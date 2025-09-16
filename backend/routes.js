const express = require('express');
const router = express.Router();
const Book = require('./models/book');

//read all (GET)
router.get('/book', async(req, res) => { //definiert Route, die auf GET-Anfragen reagiert, req: enthält Anfrageinfos, res: Antwort an Client senden, async: für await
    const allBooks = await Book.find(); //Mongoose-Aufruf, await pausiert Ausführung bis Datenbank-Abfrage abgeschlossen, const allBooks speichert Ergebnis
    console.log(allBooks); //gibt Ergebnis in Konsole aus
    res.send(allBooks); //Sendet Antwort an Client
});

//read one (GET mit id)
router.get('/book/:id', async(req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id });
        if(book) {
            res.send(book);
        } else {
            res.status(404);
            res.send({
                error: "Ups, es ist ein Fehler aufgetreten"
            });
        }
    } catch (err) {
        console.error(err);
        res.status(400);
        res.send({
             error: "Buch noch nicht im Regal"
        }); // ungültige ObjectId
    }
})

//create (POST)
router.post('/book', async(req, res) => { //definiert Route, die auf POST-Anfragen reagiert
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        status: req.body.status,
        pagesTotal: req.body.pagesTotal,
        pagesRead: req.body.pagesRead,
        rating: req.body.rating,
        notes: req.body.notes,
        coverURL: req.body.coverURL
    })
    await newBook.save(); //speichert
    res.send(newBook); //Schickt gespeicherte Daten an Client
});

//update (Patch)
router.patch('/book/:id', async(req, res) => {
    try {
        const book = await Book.findOne({ _id: req.params.id })

        if (req.body.title) {
            book.title = req.body.title
        }

        if (req.body.author) {
            book.author = req.body.author
        }

        if (req.body.genre) {
            book.genre = req.body.genre
        }

        if (req.body.status) {
            book.status = req.body.status
        }

        if (req.body.pagesTotal) {
            book.pagesTotal = req.body.pagesTotal
        }

        if (req.body.pagesRead) {
            book.pagesRead = req.body.pagesRead
        }

        if (req.body.rating) {
            book.rating = req.body.rating
        }

        if (req.body.notes) {
            book.notes = req.body.notes
        }

        if (req.body.coverURL) {
            book.coverURL = req.body.coverURL
        }

        await Book.updateOne({ _id: req.params.id }, book);
        res.send(book)
    } catch {
        res.status(404)
        res.send({ error: "Das Buch ist noch nicht im Regal" })
    }
});

// delete (DELETE)
router.delete('/book/:id', async(req, res) => {
    try {
        await Book.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Das Buch ist noch nicht im Regal" })
    }
});


module.exports = router;