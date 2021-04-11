const express = require('express');
const router = express.Router();
const Blogs = require('../models/blogs');
const { check, validationResult } = require('express-validator');

router.get('/add', (req, res, next) => {
    res.render('blogs/add');
})

// Create
router.post('/add', [
    check('name', 'name is required').not().isEmpty(),
    check('author', 'author is required').not().isEmpty(),
    check('detail', 'detail is required').not().isEmpty()
], (req, res, next) => {

    //validate
    const result = validationResult(req);
    let errors = result.errors;
    for (let key in errors) console.log(errors[key].value);

    if (!result.isEmpty()) {
        res.render('blogs/add', { errors: errors });

    } else {
        // add value to data object
        data = new Blogs({
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            detail: req.body.detail
        });
 
        // create collection to mongo
        Blogs.createBlog(data, (err) => {
            if (err) console.log(`error: ${err}`);
            res.redirect('/blogs');
        });
    };
});

// READ
router.get('/', (req, res, next) => {
    Blogs.getAllBlogs((err, blogs) => {
        if (err) console.log(`ERROR: ${err}`)
        res.render('blogs/view', { blogs: blogs });
    });
});

// UPDATE
router.get('/edit/:id', (req, res, next)=> {
    Blogs.getBlog([req.params.id], (err, blog)=> {
        if(err) console.log(err);
        res.render('blogs/editForm', {blog: blog})
    })
});

router.post('/edit', [
    check('name', 'name is required').not().isEmpty(),
    check('author', 'author is required').not().isEmpty(),
    check('detail', 'detail is required').not().isEmpty()
], (req, res, next) => {

    //validate
    const result = validationResult(req);
    let errors = result.errors;
    for (let key in errors) console.log(errors[key].value);

    if (!result.isEmpty()) {
        res.redirect('blogs/');

    } else {
        // add value to data object
        data = new Blogs({
            id: req.body.id,
            name: req.body.name,
            author: req.body.author,
            category: req.body.category,
            detail: req.body.detail
        });
 
        // create collection to mongo
        Blogs.editBlog(data, (err) => {
            if (err) console.log(`error: ${err}`);
            res.redirect('/blogs');
        });
    };
});

// DELETE
router.get('/delete/:id', (req, res, next) => {
    Blogs.deleteBlog([req.params.id], err => { 
        if (err) throw err
        console.log('DELETE COMPLETE !!!')
        res.redirect('/blogs')
    });
});

module.exports = router;