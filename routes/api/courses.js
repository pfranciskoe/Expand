const express = require('express');
const router = express.Router();
const passport = require('passport');
const AWS = require('aws-sdk');
const AWS_SECRET_ACCESS_KEY = require('../../config/keys')
  .AWS_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY_ID = require('../../config/keys').AWS_ACCESS_KEY_ID;
const AWS_BUCKET_NAME = require('../../config/keys').AWS_BUCKET_NAME;
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const Course = require('../../models/Course');
const validateCourseInput = require('../../validation/course');

//get index of courses
router.get('/', (req, res) => {
  Course.find()
    .sort({ date: -1 })
    .then((courses) => res.json(courses))
    .catch((err) =>
      res.status(404).json({ nocoursesfound: 'No courses found' })
    );
});

//show course
router.get('/:id', (req, res) => {
  Course.findById(req.params.id)
    .populate('instructor')
    .populate('students')
    .populate('lessons')
    .then((course) => res.json(course))
    .catch((err) => res.status(404).json({ nocoursefound: 'No course found' }));
});

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: AWS_BUCKET_NAME,
});

const imageUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: { fileSize: 1000000000 }, // 1GB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('file');

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

//create course
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    imageUpload(req, res, (error) => {
      let thumbnailUrl = '';
      if (error || req.file === undefined) {
        thumbnailUrl = req.body.thumbnailUrl;
      } else {
        thumbnailUrl = req.file.location;
      }
      const newCourse = new Course({
        title: req.body.title,
        description: req.body.description,
        instructor: req.body.instructor,
        thumbnailUrl,
      });
      newCourse.save().then((course) => res.json(course.populate('students')));
    });
  }
);

//update course
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Course.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .populate('instructor')
      .populate('students')
      .populate('lessons')
      .exec(function (err, course) {
        res.json(course);
      });
  }
);

//delete course
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Course.findOneAndDelete({ _id: req.params.id }, function (err, course) {
      res.json(course);
    });
  }
);

module.exports = router;
