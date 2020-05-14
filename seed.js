const mongoURL = require('./config/keys');
const User = require('./models/User.js')
const Course = require('./models/Course.js')
const Lesson = require('./models/Lesson.js')
const Comment = require('./models/Comment.js')
const Response = require('./models/Response.js')
const mongoose = require('mongoose')
mongoose.connect(mongoURL.mongoURI, {useNewUrlParser: true});

User.deleteMany({},(err)=>console.log(err))
Course.deleteMany({},(err)=>console.log(err))
Lesson.deleteMany({},(err)=>console.log(err))
Comment.deleteMany({},(err)=>console.log(err))
Response.deleteMany({},(err)=>console.log(err))


const users_arr = [
        {
                'firstName': 'Peter',
                'lastName': 'Koe',
                'instructor': true,
                'email': 'peter@koe.com',
                'password': 'password',
                'courses': []
        }, 
        {
                'firstName': 'Erick Santos',
                'lastName': 'Koe2',
                'instructor': false,
                'email': 'erick@santos.com',
                'password': 'password',
                'courses': []
        },
        {
                'firstName': 'Zoe',
                'lastName': 'Lin',
                'instructor': false,
                'email': 'zoe@lin.com',
                'password': 'password',
                'courses': []
        },
        {
                'firstName': 'Grant',
                'lastName': 'Kleinman',
                'instructor': false,
                'email': 'grant@kleinman.com',
                'password': 'password',
                'courses': []
        }
];


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
                                                                author: user1,
                                                                text: "Oh yeah, I forgot to say...",
                                                                lesson: lesson1,
                                                                timestamp: 22,
                                                                videoUrl: '/responses/111'
                                                        },
                                                ]

                                                Comment.create(comments_arr, function (err, comments) {
                                                        if (err) { console.log(err) }
                                                        else {
                                                                let comment0 = comments[0]._id;
                                                                let comment1 = comments[1]._id;
                                                                let comment2 = comments[2]._id;

                                                                lessons[0].comments = [comment0, comment1];
                                                                lessons[1].comments = [comment2];
                                                                lessons[0].save();
                                                                lessons[1].save();

                                                                const responses_arr = [
                                                                        {
                                                                                author: user1,
                                                                                text: "These are the potatoes of Omicron Persei 8, which are both alive and sentient.",
                                                                                parent: comment0,
                                                                        },
                                                                        {
                                                                                author: user2,
                                                                                text: "Remember when Dan Quayle insisted that potato was spelled with an E?",
                                                                                parent: comment0,
                                                                        },
                                                                        {
                                                                                author: user3,
                                                                                text: "Ooga ooga booga.",
                                                                                parent: comment0,
                                                                        },
                                                                        {
                                                                                author: user1,
                                                                                text: "See this video for thorough instruction on doing the twist.",
                                                                                parent: comment1,
                                                                                videoUrl: '/newResponseVideoHere',
                                                                        },
                                                                        {
                                                                                author: user2,
                                                                                text: "Great followup, thank you!!",
                                                                                parent: comment2,
                                                                                videoUrl: '/newResponseVideoHere',
                                                                        },
                                                                ]

                                                                Response.create(responses_arr, function (err, responses) {
                                                                        if (err) { console.log(err) }
                                                                        else {
                                                                                let response0 = responses[0]._id;
                                                                                let response1 = responses[1]._id;
                                                                                let response2 = responses[2]._id;
                                                                                let response3 = responses[3]._id;
                                                                                let response4 = responses[4]._id;

                                                                                comments[0].responses = [response0, response1];
                                                                                comments[1].responses = [response2];
                                                                                comments[1].responses = [response2];
                                                                                comments[0].save();
                                                                                comments[1].save();
                                                                                
                                                                                users[0].responses = [response0, response3];
                                                                                users[1].responses = [response1, response4];
                                                                                users[2].responses = [response2];
                                                                        }
                                                                })
                                                        }
                                                })
                                        }
                                })
                        }
                })
        }
})