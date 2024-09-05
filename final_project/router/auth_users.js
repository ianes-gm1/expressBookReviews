const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    //returns boolean
    const userMatches = users.filter((user) => user.username === username);
    return userMatches.length > 0;
  }
  
  const authenticatedUser = (username,password)=>{ 
    //returns boolean
    //write code to check if username and password match the one we have in records.
    const matchingUsers = users.filter((user) => user.username === username && user.password === password);
    return matchingUsers.length > 0;
  }





//  Task 7
//  Only registered users can login
//  Login endpoint
regd_users.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if username or password is missing
    if (!username || !password) {
        res.status(500).json({message: "Error- Loging in"});
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        res.status(500).json({message: "Error- Invalide Login"});
    }
});



//  Task 8
//  Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.body.review;
    const username = req.session.authorization.username;
    if (books[isbn]) {
      let book = books[isbn];
      book.reviews[username] = review;
      res.status(200).send("Review posted");
    }
    else {
        res.status(500).json({message: "Error- no books with the given titel"});
    }
  });


  

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
