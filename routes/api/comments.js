const express = require("express");
const router = express.Router();
const passport = require('passport');
const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comment');

router.get("/test", (req, res) => res.json({ msg: "This is the comments route" }));

//show comment
router.get("/:id", (req, res) => {
    Comment.findById( req.params.id ).populate('author').populate('lesson')
        .populate({ 
            path: 'responses',
            populate: {
            path: 'author'
            } 
        })
        .then(comment => res.json(comment))
        .catch(err => res.status(404).json({ nocommentfound: 'No comment found' }));    
})

//post comment
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCommentInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newComment = new Comment({
            author: req.body.author,
            text: req.body.text,
            lesson: req.body.lesson,
            timestamp: req.body.timestamp,
        });

        newComment.save().then(comment => res.json(comment));
    }
);

//update comment
router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCommentInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Comment.findOneAndUpdate({ _id: req.params.id }, req.body, 
            { new: true }, function (err, comment) {
                res.json(comment);
        });
    }   
);

//delete comment
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Comment.findOneAndDelete({ _id: req.params.id },
            function (err, comment) {
                res.json(comment);
            });
    }
);

module.exports = router; 