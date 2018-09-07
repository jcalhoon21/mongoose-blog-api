const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            if(users) {
                res.status(200).json(users);
            } else {
                res.status(404).json(users);
            }
        });
});

router.get('/:id', (req, res) => {
    User
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
    let newUser = new User(req.body);
    newUser
        .save()
        .then(save => {
            if (save) {
                res.status(201).json(save);
            } else {
                res.status(404).json(save);
            }
        });
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id)
        .then(update => {
            if(update) {
                res.status(204).json(update);
            } else {
                res.status(404).json(update);
            }
        });
});

router.delete('/:id', (req, res) => {
    User
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