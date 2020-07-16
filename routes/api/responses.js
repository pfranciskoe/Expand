const express = require('express');
const router = express.Router();
const passport = require('passport');
const Response = require('../../models/Response');
const validateResponseInput = require('../../validation/response');
const AWS = require('aws-sdk');
const AWS_Uploaded_File_URL_LINK = require('../../config/keys')
  .AWS_Uploaded_File_URL_LINK;
const AWS_REGION = require('../../config/keys').AWS_REGION;
const AWS_SECRET_ACCESS_KEY = require('../../config/keys')
  .AWS_SECRET_ACCESS_KEY;
const AWS_ACCESS_KEY_ID = require('../../config/keys').AWS_ACCESS_KEY_ID;
const AWS_BUCKET_NAME = require('../../config/keys').AWS_BUCKET_NAME;
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const url = require('url');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/test', (req, res) =>
  res.json({ msg: 'This is the responses route' })
);

//show response
router.get('/:id', (req, res) => {
  Response.findById(req.params.id)
    .populate('author')
    .populate('parent')
    .then((response) => res.json(response))
    .catch((err) =>
      res.status(404).json({ noresponsefound: 'No comment response found' })
    );
});

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: AWS_BUCKET_NAME,
});

const lessonUpload = multer({
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
  limits: { fileSize: 10000000 }, // 10MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
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
//post response
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    lessonUpload(req, res, (error) => {
      if (error) {
        res.json({ error: error });
      } else {
        if (req.file) {
          const newResponse = new Response({
            author: req.body.author,
            text: req.body.text,
            parent: req.body.parent,
            videoUrl: req.file.location,
          });
          newResponse.save().then((response) => {
            Comment.findOneAndUpdate(
              { _id: response.parent },
              { $push: { responses: response._id } }
            ).then(() => res.json(response));
          });
        } else {
          const newResponse = new Response({
            author: req.body.author,
            text: req.body.text,
            parent: req.body.parent,
          });
          newResponse.save().then((response) => {
            Comment.findOneAndUpdate(
              { _id: response.parent },
              { $push: { responses: response._id } }
            ).then(() => res.json(response));
          });
        }
      }
    });
  }
);

//update response
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateResponseInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Response.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .populate('author')
      .populate('parent')
      .exec(function (err, response) {
        res.json(response);
      });
  }
);

//delete response
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Response.findOneAndDelete({ _id: req.params.id }, function (err, response) {
      Comment.findOneAndUpdate(
        { _id: response.parent },
        { $pull: { responses: [response._id] } }
      ).then(() => res.json(response));
    });
  }
);

module.exports = router;
