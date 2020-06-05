const express = require("express");
const router = express.Router();
const passport = require('passport');
const validateLessonInput = require('../../validation/lesson')

const AWS = require("aws-sdk");
const AWS_SECRET_ACCESS_KEY = require('../../config/keys').AWS_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY_ID = require('../../config/keys').AWS_ACCESS_KEY_ID;
const AWS_BUCKET_NAME = require('../../config/keys').AWS_BUCKET_NAME;

const multer = require("multer");
const multerS3 = require('multer-s3');
const path = require('path');

const Lesson = require('../../models/Lesson');

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
    Lesson.findById( req.params.id )
        .populate('instructor')
        .populate('course') 
        .populate({ 
            path: 'comments',
            populate: {
                path:'author',
                path: 'responses',
                populate: {
                    path: 'author',
                },
            },
        })
        .populate({
            path:'comments',
            populate: {
                path: 'author',
            },
        })
        .then(lesson => res.json(lesson))
        .catch(err => res.status(404).json({ nolessonfound: 'No lesson found' }));    
})

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    Bucket: AWS_BUCKET_NAME
});

const lessonUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000000 }, // 2GB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file');

function checkFileType(file, cb) {
    const filetypes = /mp4|ogg|avi|wmv|mov|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Videos Only!');
    }
}

//create lesson
router.post('/upload', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        lessonUpload(req, res, (error) => {
            if (error) {
                res.json({ error: error });
            } else { //upload failed
                if (req.file === undefined) {
                    res.json('Error: No File Selected');
                } else { // save file
                    const newLesson = new Lesson({
                        title: req.body.title,
                        description: req.body.description,
                        videoUrl: req.file.location,
                        instructor: req.body.instructor,
                        course: req.body.course,
                        order: req.body.order,
                        thumbnailUrl: req.body.thumbnailUrl
                    });
                    newLesson.save().then(lesson => res.json(lesson));
                }
            }
        });
});

//update lesson
router.patch('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateLessonInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Lesson.findOneAndUpdate({ _id: req.params.id }, req.body, 
            { new: true } )
            .populate('instructor')
            .populate('course') 
            .populate({ 
                path: 'comments',
                populate: {
                    path: 'responses',
                    populate: {
                        path: 'author',
                    },
                },
            })
            .populate({
                path:'comments',
                populate: {
                    path: 'author',
                },
            })
            .exec(function(err, user) {
                res.json(user);
        });
    }
);




//delete lesson
router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Lesson.findOneAndDelete({ _id: req.params.id },
            function (err, lesson) {
                let params = {
                    Bucket: AWS_BUCKET_NAME,
                    Key: lesson.videoUrl.split(".com/")[1]
                };
                s3.deleteObject(params, (err, data) => {
                    if (err) {
                        return res.status(400).json(err);
                    } else {
                        res.send({
                            status: "200",
                            responseType: "string",
                            response: "success"
                        });
                    }
                });
                // res.json(lesson);
            });
    }
);

module.exports = router; 