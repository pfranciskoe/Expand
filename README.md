# Expand
An online video learning platform offering a new level of student and instructor engagement through video comment heatmaps and instructor video replies.
  
## Technologies
* MongoDB
* Mongoose
* Express.js
* React
* Redux
* Node.js
* AWS S3 integration
* Heroku deployment
  
## Features
  
### HomePage
<p align="center">
  <img width="auto" height="auto" src="https://github.com/pfranciskoe/Expand/blob/master/demo/expd-1.gif?raw=true">
</p>

  
### Courses & Lessons
* Users can view all the courses and its details
* Instructors are able to create, edit and delete courses

<p align="center">
  <img width="auto" height="auto" src="https://github.com/pfranciskoe/Expand/blob/master/demo/expd-2.gif?raw=true">
</p>
  
* Students can enroll in courses
* Students can view the videos in a course
  
<p align="center">
  <img width="auto" height="auto" src="https://github.com/pfranciskoe/Expand/blob/master/demo/expd-3.gif?raw=true">
</p>

* Instructors can add a lesson and upload videos to their courses.
  
<p align="center">
  <img width="auto" height="auto" src="https://github.com/pfranciskoe/Expand/blob/master/demo/expd-6.gif?raw=true">
</p>

### Comments and Responses
* Users are able to make time stamped comments on videos. Comments from students are displayed as blue circles while comments from instructors are displayed as red circles.
* Instructors can reply to comments through either a video or text response.
  
<p align="center">
  <img width="auto" height="auto" src="https://github.com/pfranciskoe/Expand/blob/master/demo/expd-5.gif?raw=true">
</p>

## Uploading to AWS Cloud Services
Lesson videos and course thumbnails are saved to AWS through the use of multer middleware to handle file uploading.
    We imposed file type restrictions and a size limit to reduce storage costs. After a new lesson form submission succeeds, the
    corresponding course is updated to include the new lesson.
```javascript
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
When a student submits a comment/question, the submission is represented in a heatmap below the video.
    Each comment is represented as a circle drawn in a canvas element at their corresponding timestamp in the video. 
    This allows the instructor to identify specific areas of the lesson where students had the most questions. 
    Clicking on a region in the heatmap will take you to the appropriate comments to which instructors can reply by text and/or video.

```javascript
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
