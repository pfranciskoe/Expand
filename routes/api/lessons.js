const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Lesson = require('../../models/Lesson');
//validations go here

//all lessons
router.get("/", (req, res) => {
    Lesson.find()
        .sort({ date: -1 })
        .then(lessons => res.json(lessons))
        .catch(err => res.status(404).json({ nolessonsfound: 'No lessons found' }));
});

//single lesson
router.get("/:id", (req, res) => {
    Lesson.findById(req.params.id)
        .then(lesson => res.json(lesson))
        .catch(err => res.status(404).json({ nolessonfound: 'No lesson found' }));
})

//create lesson
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        const newLesson = new Lesson({
            title: req.body.title,
            description: req.body.description,
            fileLink: req.body.fileLink,
        });

        newLesson.save().then(lesson => res.json(lesson));
    }
);

//update lesson
router.patch('/:id',
    (req, res) => {

        Lesson.findOneAndUpdate({ _id: req.params.id }, req.body,
            { new: true }, function (err, lesson) {
                res.json(lesson);
            });
    }
);

//delete lesson
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Lesson.findOneAndDelete({ _id: req.params.id },
            function (err, lesson) {
                res.json(lesson);
            });
    }
);

module.exports = router; 