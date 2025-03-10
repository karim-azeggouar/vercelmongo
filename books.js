// Load express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
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

// route 1    home
 





app.get('/', (req, res) =>{
res. send( "Welcome to books service !!!")
})



// route 2    insert new book 


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
    res.json({ message: "a new book added !!!" });
    }).catch((err) => {
    
    if(err){
    
    throw err
    }

   



}) 



})

// route 3 list of books


app.get('/books', (req, res) =>{
  
Book.find().then((books)=>{
  console.log(books)
  res.json({ 'books': books });

})

  })


// route 4 getbookbyid


app.get('/books/:id', (req, res) =>{
  
  Book.findById(req.params.id).then((book)=>{
    if(book)
    {
      res.json({ book: book });
    }
  
  })
  
    })

  // route 5 delete 

    app.delete('/books/:id', (req, res) =>{
  
      Book.findOneAndRemove(req.params.id).then(()=>{
        
          res.json({ "msg": "book deleted" });
      
      
      })
      
        })



        app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}`);
        });
      
      
      // Exportation pour Vercel (nécessaire pour le déploiement)
      module.exports = app;
      