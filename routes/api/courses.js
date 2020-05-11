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
router.get("/:id", (req, res => {
    Course.findById( req.params.id )
        .then(course => res.json(course))
        .catch(err => res.status(404).json({ nocoursefound: 'No course found' }));    
}))

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
        });

        newCourse.save().then(course => res.json(course));
    }
);

//update course
router.post('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateCourseInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }
        
    // 
        Course.updateOne(req.params.body)
        const newCourse = Course.findById(req.params.id)
        .then(() => res.json(newCourse))
        
    }
);

// await CharacterModel.updateOne({ name: 'Jon Snow' }, {
//     title: 'King in the North'
// });

// // Load the document to see the updated value
// const doc = await CharacterModel.findOne();
// doc.title; // "King in the North"