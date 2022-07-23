const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//schema define the structure of documents (mongodb documents)
//model surrounds schema and provide us with interface by which we can 
//communicate with a database collection for that document type

//pass object as param to define structure 
const blogSchema = new Schema({
    //w nawiasach {} zaby wprowadzic rozne zaleznosci do danej zmiennej, tutja po to zeby wprowadzic wymagane pole 
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true});

//model creation
//gonna look for name (1st argument), plurize it and loook for it in db
const Blog = mongoose.model('Blog', blogSchema);
//export this^ model so we can use it elsewhere in the project
module.exports = Blog;