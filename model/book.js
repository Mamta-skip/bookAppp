const { Mongoose, default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;
const blogPost =new Schema({
    bookName:String,
    bookAuthor:String,
    bookDes:String
})
const Book =mongoose.model('Book',blogPost);
module.exports=Book;