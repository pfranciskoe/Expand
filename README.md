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


### Day 1 (Zoe Front, Peter Back)
* User Auth Day (front and back end)
* Backend Course Framework
Frontend
    Login/Signup Splash
    Teacher Home Page / User Home Page
### Day 2 (Zoe Back, Peter Front)
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
* Css cleanup/ js responsive animations.
Frontend
    Video Page + comments