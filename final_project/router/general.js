const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});




// task 1
// Get the book list available in the shop
public_users.get('/',function (req, res) {
  try {
    res.send(JSON.stringify(books));
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Error- not able to retrieve book list"});
  }
});





// task 2
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn
    if (books[isbn]) {
        res.send((JSON.stringify(books[isbn])));
    } else {
        res.status(500).json({message: "Error- not able to retrieve book by the isbn"});
    }
 });
  





 // task 3
 // Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    const author_books = []
    for (let key in books) {
        if (books[key].author === author) {
            author_books.push(books[key]);
        }}
    if (author_books.length === 0) {
        res.status(500).json({message: "Error- no books with the given author"});
    }else{
        res.send((JSON.stringify(author_books)))
    }
});






// task 4
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    const title_books = []
    for (let key in books) {
        if (books[key].title === title) {
            title_books.push(books[key]);
        }}
    if (title_books.length === 0) {
        res.status(500).json({message: "Error- no books with the given titel"});
    }else{
        res.send((JSON.stringify(title_books)))
    }
});








//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
