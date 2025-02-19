// Load express
const express = require("express");
const app = express();

// load Book model 

require('./Book')

// Load mongoose
const mongoose = require("mongoose");

// Load body-parser

const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Connect




 const uri = 'mongodb+srv://fullstack:9W7ViknZZUJRFN1a@library.hzn9f6i.mongodb.net/test';

 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => console.log('Connected to MongoDB !!!'))
   .catch(err => console.error('Could not connect to MongoDB', err));

// route 1






app.get('/', (req, res) =>{
res. send( "Welcome to books service !!!")
})



// route 2


const  Book=mongoose.model('Book')
app.post("/book", (req, res) => {
    var newBook = {
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher
    }

    let book=new Book(newBook)

    book.save().then(() => {
    
    console. log("New book created!")
    }).catch((err) => {
    
    if(err){
    
    throw err
    }

res.send("a new book added !!!")


}) 



})





app. listen(4545, () =>console.log("Up and running! -- This is our Books service"));
