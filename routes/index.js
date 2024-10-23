var express = require('express');
var router = express.Router();
const { ObjectId } = require('mongodb');

const Book =require('../model/book')
/* GET home page. */
router.get('/', async function(req, res, next) {
  const books = await Book.find();
  res.render('index', { title: 'Express hello changesssss gegege',books:books});
});
router.get('/addbook',function(req,res,next){
  res.render('addbook')
})
router.post('/save', async function(req,res,next){
 try {
  const newBook =new Book(req.body);
  console.log(req.body);
  await newBook.save();
  console.log('Book saved:',newBook);

 } catch (error) {
  console.log(error)
 }
})

router.get('/edit/:id',async function(req, res, next) {
  try{
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    res.render('edit-books',{book});
  }catch(err){
    console.log(err);
  }
});

router.post('/update/:id', async function(req, res, next) {
  try {
    const bookId = req.params.id;
    const updatedData = req.body; 
    await Book.findByIdAndUpdate(bookId, updatedData, { new: true }); 
    res.redirect("/"); 
  } catch (err) {
    console.log(err);
    res.status(500).send("Cannot update book.");
  }
});


router.post('/delete/:id',async function(req, res, next) {
  try{
   const bookId = req.params.id;
   console.log('Delete book with id', bookId);
   await Book.findByIdAndDelete(new ObjectId(bookId));
   res.redirect("/");
  }catch(err){
   console.log(err); 
   res.status(500).send("Cannot delete book.");
  }
});
module.exports = router;
