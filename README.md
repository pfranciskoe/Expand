# Expand
## Background
A Learning tool for teachers to followup with students when they have questions.


## MVPS / Base Features
- [ ] User Auth
* Users can sign up as students or teachers.
* Users can log in
- [ ] Courses
* Courses can be viewed on a searchable index
* teachers should be able to make and delete a course 
* students can enroll in a course
* Courses can have multiple videos
- [ ] Video Posting
* teachers should be able to post and delete videos to course
- [ ] Video Reply System
* students should be able to make time stamped comments on videos.
* teachers should be able to reply to either one or many comments with a video or text message.
* students and teacher should be able to see comments in the the UI of the video player.

Bonus
- [ ] Time stamped links
* students and teachers should be able to comment with time stamped links to other videos.
- [ ] Chat
* students and teachers should be able to directly message one another.


## Tech Overview
* MongoDB
* Mongoose
* Express
* React-Redux
* NodeJS
* Backend Server S3
* Deploy through Heroku or AWS


## Work Breakdown


### Day 1 
* User Auth Day (front and back end)
* Backend Course Framework
Frontend
    Login/Signup Splash
    Teacher Home Page / User Home Page
### Day 2 
* Finish Up User Auth Day (front and back end)
Frontend
    Teacher Home Page(Their Courses) / User Home Page(Their Courses)
    Course Index Page
    Course Show Page
### Day 3
* Backend AWS Video Hosting
* Frontend Video interface
* Backend AWS Video Hosting + Commenting Framework
* Frontend Video interface + Commenting
Frontend
    Course Show Page
    Video Page
### Day 4
* Backend Recieve and Accept timestamps refs
* Comment interface and User interaction improvements.
Frontend
    Video Page + comments
### Day 5
* Cleanup and final pushes to deployment app.
* Css cleanup / js responsive animations.
Frontend
    Video Page + comments


## Uploading to AWS Cloud Services
Lesson videos and course thumbnails are saved to AWS through the use of multer middleware to handle file uploading.
    We imposed file type restrictions and a size limit to reduce storage costs. After a new lesson form submission succeeds, the
    corresponding course is updated to include the new lesson.
```
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
```

## Heatmap to track comments
When a student submits a comment/question, the timestamped submission is represented in a heatmap below the video.
    This allows the instructor to identify specific areas of the lesson where students had the most questions. Clicking
    on a region in the heatmap will take you to the appropriate comments to which instructors can reply by text and/or video.

```
  draw (ctx, comments, vidLength) {
    comments.forEach((comment) => {
      const timeRound = comment.timestamp / vidLength
      ctx.beginPath()
      if (comment.author.instructor) {
        ctx.fillStyle = '#f5a2a2'
      } else { ctx.fillStyle = '#a2cdf5' }
      ctx.arc(15 + (2000 * timeRound), 15, 15, 0, 2 * Math.PI, false)
      ctx.fill()
    })
  }
```

## Coming soon
* Chat: students and instructors can directly message each other
* Video splicing: instructors can replace/redirect parts of one video to another video

## Contributors
<table>
  <tr>
    <td align="center">
        <a href="https://github.com/pfranciskoe">
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQHhbc33qphMEA/profile-displayphoto-shrink_200_200/0?e=1597276800&v=beta&t=b-V-kVFRq0RLaa76-S4k80LM3zLUf9ivYITZuJ-i-d8" width="100px;" alt="Peter Koe" title="Peter Koe"/>
            <br/>
            <sub><b>Peter Koe</b></sub>
        </a>
        <br/>
    </td>
    <td align="center">
        <a href="https://github.com/Arctive">
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQHTrNE7OvY4Sg/profile-displayphoto-shrink_200_200/0?e=1594857600&v=beta&t=No2QgCPzapfVPeAOlfPTk1onVnRhcpj2ci_JbFV_NXU" width="100px;" alt="Erick Santos" title="Erick Santos"/>
            <br/>
            <sub><b>Erick Santos</b></sub>
        </a>
        <br/>
    </td>
    <td align="center">
        <a href="https://github.com/gmkleinman">
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQEFYF32YbNzZA/profile-displayphoto-shrink_400_400/0?e=1596672000&v=beta&t=px5LGzcQQt3277GwgcGmjcMAfWk6i9hk7GKSaqI30qM" width="100px;" alt="Grant Kleinman" title="Grant Kleinman"/>
            <br/>
            <sub><b>Grant Kleinman</b></sub>
        </a>
        <br/>
    </td>
    <td align="center">
        <a href="https://github.com/zixlin7">
            <img src="https://media-exp1.licdn.com/dms/image/C5603AQG3nJVhyelE8A/profile-displayphoto-shrink_200_200/0?e=1594857600&v=beta&t=laiR9ECKD-Gq2s3xLDTBY62BV_Rvsc7EP8rKBN1vd0k" width="100px;" alt="Zoe Lin" title="Zoe Lin"/>
            <br/>
            <sub><b>Zoe Lin</b></sub>
        </a>
        <br/>
    </td>
  </tr>
</table>