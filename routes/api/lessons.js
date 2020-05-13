const express = require("express");
const router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');

const AWS = require("aws-sdk");
const AWS_Uploaded_File_URL_LINK = require('../../config/keys').AWS_Uploaded_File_URL_LINK;
const AWS_REGION = require('../../config/keys').AWS_REGION;
const AWS_SECRET_ACCESS_KEY = require('../../config/keys').AWS_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY_ID = require('../../config/keys').AWS_ACCESS_KEY_ID;
const AWS_BUCKET_NAME = require('../../config/keys').AWS_BUCKET_NAME;

const multer = require("multer");
const multerS3 = require('multer-s3');
const path = require('path');
const url = require('url');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
router.post('/upload', (req, res) => {
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
                    fileLink: req.file.location
                });
                newLesson.save().then(lesson => res.json(lesson));
            }
        }
    });
});

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
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Lesson.findOneAndDelete({ _id: req.params.id },
            function (err, lesson) {
                res.json(lesson);
            });
    }
);

// router.route("/:id").delete((req, res, next) => {
//     DOCUMENT.findByIdAndRemove(req.params.id, (err, result) => {
//         if (err) {
//             return next(err);
//         }
//         //Now Delete the file from AWS-S3
//         // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#deleteObject-property
//         let s3bucket = new AWS.S3({
//             accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//             secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//             region: process.env.AWS_REGION
//         });

//         let params = {
//             Bucket: process.env.AWS_BUCKET_NAME,
//             Key: result.s3_key
//         };

//         s3bucket.deleteObject(params, (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 res.send({
//                     status: "200",
//                     responseType: "string",
//                     response: "success"
//                 });
//             }
//         });
//     });
// });

module.exports = router; 