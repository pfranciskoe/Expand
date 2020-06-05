const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const Course = require('../../models/Course');
const validateCourseInput = require('../../validation/course');

//get index of courses
router.get("/", (req, res) => {
    Course.find()
        .sort({ date: -1 })
        .then(courses => res.json(courses))
        .catch(err => res.status(404).json({ nocoursesfound: 'No courses found' }));
});

//show course
router.get("/:id", (req, res) => {
    Course.findById( req.params.id )
        .populate('instructor')
        .populate('students')
        .populate('lessons')
        .then(course => res.json(course))
        .catch(err => res.status(404).json({ nocoursefound: 'No course found' }));    
})

//post course
router.post('/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCourseInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            instructor: req.body.instructor,
            thumbnailUrl: req.body.thumbnailUrl
        });
        
        newCourse.save().then(course => res.json(course.populate('students')));
    }
);

//update course
router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCourseInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Course.findOneAndUpdate({ _id: req.params.id }, req.body, 
            { new: true } )
            .populate('instructor')
            .populate('students')
            .populate('lessons')
            .exec(function(err, course) {
                res.json(course);
        });
    }   
);

//delete course
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Course.findOneAndDelete({ _id: req.params.id },
            function (err, course) {
                res.json(course);
            });
    }
);

module.exports = router; 