const mongoURL = require('./config/keys');
const User = require('./models/User.js')
const Course = require('./models/Course.js')
const Lesson = require('./models/Lesson.js')
const Comment = require('./models/Comment.js')
const mongoose = require('mongoose')
mongoose.connect(mongoURL.mongoURI, {useNewUrlParser: true});

User.deleteMany({},(err)=>console.log(err))
Course.deleteMany({},(err)=>console.log(err))
Lesson.deleteMany({},(err)=>console.log(err))
Comment.deleteMany({},(err)=>console.log(err))


const users_arr = [{
            'firstName': 'Instructor',
            'lastName': 'Koe',
            'instructor': true,
            'email': 'peter@koe.com',
            'password': 'password',
            'courses': []
        }, 
        {
                'firstName': 'Student',
                'lastName': 'Koe2',
                'instructor': false,
                'email': 'peter1@koe.com',
                'password': 'password',
                'courses': []
        },
        {
                'firstName': 'Peter',
                'lastName': 'Koe3',
                'instructor': false,
                'email': 'peter2@koe.com',
                'password': 'password',
                'courses': []
        }];


User.create(users_arr, function (err, users) {
        if (err) 
                {console.log(err)}
        else {
                let user1 = users[0]._id;
                let user2 = users[1]._id;
                let user3 = users[2]._id;

                const courses_arr = [
                        {
                                'instructor': `${user1}`,
                                'students': [ `${user3}`],
                                'title': 'Potato Farming',
                                'description': 'Self explanatory',
                                'lessons': []
                        }, {
                                'instructor': `${user1}`,
                                'students': [`${user2}`, `${user3}`],
                                'title': 'Box Crushing',
                                'description': 'Less violent than it sounds',
                                'lessons': [],
                        }
                ];

                Course.create(courses_arr, function (err, courses) {
                        if (err) { console.log(err) }
                        else {
                                let course0 = courses[0]._id;
                                let course1 = courses[1]._id;
                                users[0].courses = [course0, course1]
                                users[0].save();
                                users[1].courses = [ course1]
                                users[1].save();
                                users[2].courses = [course0, course1]
                                users[2].save();
                    
                                const lessons_arr = [
                                        {
                                                title: 'Plucking potatoes out of the ground',
                                                description: 'Something about roots, if potatoes even have roots idk',
                                                videoUrl: '/videos/1234',
                                                instructor: user1,
                                                course: course0,
                                                order: 1,
                                                thumbnailUrl: '/images/1234',
                                                comments: [],
                                        },
                                        {
                                                title: 'Cooking Potatoes',
                                                description: "Boil 'em, mash 'em, stick 'em in a stew",
                                                videoUrl: '/videos/6789',
                                                instructor: user1,
                                                course: course0,
                                                order: 2,
                                                thumbnailUrl: '/images/6789',
                                                comments: [],
                                        },
                                        {
                                                title: 'Step One: Get a Box',
                                                description: "Procurement can be difficult. Watch closely for 5 tips and tricks!",
                                                videoUrl: '/videos/boxvid1',
                                                instructor: user1,
                                                course: course1,
                                                order: 1,
                                                thumbnailUrl: '/images/boxvid1',
                                                comments: [],
                                        }
                                ]

                                Lesson.create(lessons_arr, function (err, lessons) {
                                        if (err) { console.log(err) }
                                        else {
                                                let lesson0 = lessons[0]._id;
                                                let lesson1 = lessons[1]._id;
                                                let lesson2 = lessons[2]._id;
                                                courses[0].lessons = [lesson0, lesson1];
                                                courses[1].lessons = [lesson2];
                                                courses[0].save();
                                                courses[1].save();

                                                const comments_arr = [
                                                        {
                                                                author: user2,
                                                                text: "In this part you're talking about eyes, but I'm not sure potatoes are alive??",
                                                                lesson: lesson0,
                                                                timestamp: 64,
                                                        },
                                                        {
                                                                author: user2,
                                                                text: "You can mash potatoes, but can you do the twist?",
                                                                lesson: lesson1,
                                                                timestamp: 22,
                                                        },
                                                        {
                                                                author: user1, //must be a teacher
                                                                text: "Oh yeah, I forgot to say...",
                                                                lesson: lesson1,
                                                                timestamp: 22,
                                                                videoUrl: '/responses/111' //optional field for response video
                                                        },
                                                ]

                                                Comment.create(comments_arr, function (err, comments) {
                                                        if (err) { console.log(err) }
                                                        else {
                                                                let comment0 = comments[0]._id;
                                                                let comment1 = comments[1]._id;
                                                                let comment2 = comments[2]._id;

                                                                //add comments to lessons
                                                                lessons[0].comments = [comment0, comment1];
                                                                lessons[1].comments = [comment2];
                                                                lessons[0].save();
                                                                lessons[1].save();
                                                        }
                                                })
                                        }
                                })
                        }
                })
        }
})