const mongoose = require('mongoose');
const mongo = require('mongodb');
const dbUrl = 'mongodb://localhost:27017/BlogsDB';

mongoose.connect(dbUrl, {
    useNewUrlParser: true
})

const db = mongoose.connection
const Schema = mongoose.Schema

const blogSchema = new Schema({
    id: {
        type:Schema.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    }
});

const Blogs = module.exports = mongoose.model('blogs', blogSchema);
module.exports.createBlog = function(newBlogs, callback) {
    newBlogs.save(callback);
}

module.exports.getAllBlogs = (data) => {
    Blogs.find(data);
} 

module.exports.getBlog = (id, callback) => {
    let query = {
        _id: id,        
    }
    Blogs.findOne(query, callback);
}

module.exports.editBlog = (data, callback) => {
    let query = {
        _id: data.id
    }
    Blogs.findByIdAndUpdate(query, {
        $set: {
            name: data.name,
            author: data.author,
            category: data.category,
            detail: data.detail
            }
        },{new: true}, callback)
}

module.exports.deleteBlog = (id, callback) => {
    Blogs.findByIdAndDelete(id, callback);
}