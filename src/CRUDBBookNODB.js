require("dotenv").config();
const express = require('express');
const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: 'Book 1',
        author: 'Author 1'
    },
    {
        id: 2,
        title: 'Book 2',
        author: 'Author 2'
    },
    {
        id: 3,
        title: 'Book 3',
        author: 'Author 3'
    }
];

app.get('/books', (req,res) =>{
    res.json(books);
});

app.get('/books/ :id', (rep, res) => {
    const book = books.find(b => b.id === parseInt(rep.params.id));
    if (!book) res.status(404).send('Book not found');
    res.json(book);
});

//
app.post('/books', (rep, res) => {
    const book = {
        id: books.length + 1,
        title: rep.body.title,
        author: rep.body.author 
    };
    books.push(book);
    res.send(book);
});

//
app.put('/books/:id', (rep, res) => {
    const book = books.find(b => b.id === parseInt(rep.params.id));
    if (!book) res.status(404).send('Book not found');
    book.title = rep.body.title;
    book.author = rep.body.author;
    res.send(book);
});

//
app.put('/books/:id', (rep, res) => {
    const book = books.find(b => b.id === parseInt(rep.params.id));
    if (!book) res.status(404).send('Book not found');
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}...`));