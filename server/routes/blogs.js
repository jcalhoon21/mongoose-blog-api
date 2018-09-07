const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            if(blogs) {
                res.status(200).json(blogs);
            } else {
                res.status(404).json(blogs);
            }
        });
});

router.get('/featured', (req, res) => {
    Blog
        .where('featured', true)
        .then(featured => {
            if(featured) {
                res.status(200).json(featured);
            } else {
                res.status(404).json(featured);
            }
        });
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(userId => {
            if(userId) {
                res.status(200).json(userId);
            } else {
                res.status(404).json(userId);
            }
        });
});

router.post('/', (req, res) => {
    // New higher scope variable
    let dbUser = null;

    // Fetch the user from the database
    User
        .findById(req.body.authorId)
        .then(user => {
            // Store the fetched user in higher scope variable
            dbUser = user;

            // Create a blog
            const newBlog = new Blog(req.body);

            // Bind the user to it
            newBlog.author = user._id;

            // Save it to the database
            return newBlog.save();
        })
        .then(blog => {
            // Push the saved blog to the array of blogs associated with the User
            dbUser.blogs.push(blog);

            // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
            dbUser.save().then(() => res.status(201).json(blog));
        })
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body)
        .then(update => {
            if(update) {
                res.status(204).json(update);
            } else {
                res.status(404).json(update);
            }
        });
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(remove => {
            if(remove) {
                res.status(200).json(remove);
            } else {
                res.status(404).json(remove);
            }
        });
});

module.exports = router;