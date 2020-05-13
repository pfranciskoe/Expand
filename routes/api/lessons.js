const express = require("express");
const router = express.Router();
const passport = require('passport');
const Lesson = require('../../models/Lesson');
const validateLessonInput = require('../../validation/lesson');

router.get("/test", (req, res) => res.json({ msg: "This is the lessons route" }));

//get index of lessons
router.get("/", (req, res) => {
    Lesson.find()
    .sort({ order: 1 })
    .then(lessons => res.json(lessons))
    .catch(err => res.status(404).json({ nolessonsfound: 'No lessons found' }));
})

//show lesson
router.get("/:id", (req, res) => {
    Lesson.findById( req.params.id ).populate('instructor').populate('course')
        .then(lesson => res.json(lesson))
        .catch(err => res.status(404).json({ nolessonfound: 'No lesson found' }));    
})

//post lesson
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateLessonInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newLesson = new Lesson({
            title: req.body.title,
            description: req.body.description,
            videoUrl: req.body.videoUrl,
            instructor: req.body.instructor,
            course: req.body.course,
            order: req.body.order,
            thumbnaillUrl: req.body.thumbnailUrl
        });

        newLesson.save().then(lesson => res.json(lesson));
    }
);

//update lesson
router.patch('/:id',
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateLessonInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

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