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
                'firstName': 'Erick',
                'lastName': 'Santos',
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
                'instructor': true,
                'email': 'grant@kleinman.com',
                'password': 'password',
                'courses': []
        },
        {
                'firstName': 'Kevin',
                'lastName': 'Potatohead',
                'instructor': false,
                'email': 'kevin@mrpotatohead.com',
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
                let user4 = users[3]._id;
                let user5 = users[4]._id;

                const courses_arr = [
                        {
                                'instructor': `${user1}`,
                                'students': [ `${user2}`, `${user3}`, `${user5}`],
                                'title': 'Potato Farming',
                                'description': 'A deep dive into the agricultural nuances of raising spuds.',
                                'lessons': []
                        }, 
                        {
                                'instructor': `${user1}`,
                                'students': [`${user2}`, `${user3}`],
                                'title': 'GoLang 101',
                                'description': 'Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.',
                                'lessons': [],
                        },
                        {
                                'instructor': `${user1}`,
                                'students': [`${user2}`, `${user5}`],
                                'title': 'Intro to Keyboard Stock Footage',
                                'description': 'A collection of stock footage featuring keyboards.',
                                'lessons': [],
                        },
                        {
                                'instructor': `${user4}`,
                                'students': [`${user2}`, `${user5}`],
                                'title': 'Intro to HTML',
                                'description': "A quick look into HTML fundamentals.",
                                'lessons': [],
                        },
                        {
                                'instructor': `${user4}`,
                                'students': [`${user3}`, `${user5}`],
                                'title': 'Complete React&Redux Tutorial',
                                'description': "A complete course on the fundamentals of React and Redux.",
                                'lessons': [],
                        },
                ];

                Course.create(courses_arr, function (err, courses) {
                        if (err) { console.log(err) }
                        else {
                                let course0 = courses[0]._id;
                                let course1 = courses[1]._id;
                                let course2 = courses[2]._id;
                                let course3 = courses[3]._id;
                                let course4 = courses[4]._id;
                                users[0].courses = [course0, course1, course2]
                                users[0].save();
                                users[1].courses = [course0, course1, course2, course3]
                                users[1].save();
                                users[2].courses = [course0, course1, course4]
                                users[2].save();
                                users[3].courses = [course3, course4]
                                users[3].save();
                                users[4].courses = [course0, course2, course3, course4]
                                users[4].save();
                    
                                const lessons_arr = [
                                        {
                                                title: 'Plucking Potatoes Out of the Ground',
                                                description: 'Something about roots, if potatoes even have roots idk find out with this video.',
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/rick-1589412873465.mp4',
                                                instructor: user1,
                                                course: course0,
                                                order: 1,
                                                thumbnailUrl: '/images/1234',
                                                comments: [],
                                        },
                                        {
                                                title: 'Cooking Potatoes',
                                                description: "Boil 'em, mash 'em, stick 'em in a stew.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/rick-1589412873465.mp4',
                                                instructor: user1,
                                                course: course0,
                                                order: 2,
                                                thumbnailUrl: '/images/potato2',
                                                comments: [],
                                        },
                                        {
                                                title: 'Understanding Potatoes',
                                                description: "Potatoes are our friends. Treat them with dignity and respect, and they'll end up tastier.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/rick-1589412873465.mp4',
                                                instructor: user1,
                                                course: course0,
                                                order: 3,
                                                thumbnailUrl: '/images/potato3',
                                                comments: [],
                                        },
                                        {
                                                title: 'Introduction to Go',
                                                description: "Welcome to our introduction to the Go programming language. This lesson will provide an introduction to Go.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/golang1.mp4',
                                                instructor: user1,
                                                course: course1,
                                                order: 1,
                                                thumbnailUrl: '/images/boxvid1',
                                                comments: [],
                                        },
                                        {
                                                title: 'Setting Up a Development Environment',
                                                description: "This lesson will provide a structured approach describing an introductory development environment to get you programming in Go.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/Golang2.mp4',
                                                instructor: user1,
                                                course: course1,
                                                order: 2,
                                                thumbnailUrl: '/images/boxvid1',
                                                comments: [],
                                        },
                                        {
                                                title: 'Variables',
                                                description: "This lesson will go in-depth describing the nuances of Go variables.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/golang3.mp4',
                                                instructor: user1,
                                                course: course1,
                                                order: 3,
                                                thumbnailUrl: '/images/boxvid1',
                                                comments: [],
                                        },
                                        {
                                                title: 'Typing',
                                                description: "Just some plain stock footage of someone typing.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/Computer+Keyboard+-+3174.mp4',
                                                instructor: user1,
                                                course: course2,
                                                order: 1,
                                                thumbnailUrl: '/images/dada1',
                                                comments: [],
                                        },
                                        {
                                                title: 'Typing with Coffee',
                                                description: "This individual is much more productive now that they have a nice shot of espresso.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/Keyboard+-+1046.mp4',
                                                instructor: user1,
                                                course: course2,
                                                order: 2,
                                                thumbnailUrl: '/images/dada1',
                                                comments: [],
                                        },
                                        {
                                                title: 'Typing with a Fan',
                                                description: "To be honest we are not completely sure if any typing is going on. Cool fan though.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/Homework+-+1028.mp4',
                                                instructor: user1,
                                                course: course2,
                                                order: 3,
                                                thumbnailUrl: '/images/dada1',
                                                comments: [],
                                        },
                                        {
                                                title: "Introduction",
                                                description: "A quick summary of HTML.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/y2mate.com+-+HTML+Tutorial+for+Beginners+-+00+-+Introduction+to+HTML_dD2EISBDjWM_240p.mp4',
                                                instructor: user4,
                                                course: course3,
                                                order: 1,
                                                thumbnailUrl: '/images/womp1',
                                                comments: [],
                                        },
                                        {
                                                title: "Creating Your First Webpage",
                                                description: "https://expand-dev.s3-us-west-1.amazonaws.com/y2mate.com+-+HTML+Tutorial+for+Beginners+-+01+-+Creating+the+first+web+page_-USAeFpVf_A_144p.mp4",
                                                videoUrl: '/videos/womp1',
                                                instructor: user4,
                                                course: course3,
                                                order: 2,
                                                thumbnailUrl: '/images/womp1',
                                                comments: [],
                                        },
                                        {
                                                title: "Line breaks, Spacing, and Comments",
                                                description: "https://expand-dev.s3-us-west-1.amazonaws.com/y2mate.com+-+HTML+Tutorial+for+Beginners+-+02+-+Line+breaks%2C+spacing%2C+and+comments_i3GE-toQg-o_240p.mp4",
                                                videoUrl: '/videos/womp1',
                                                instructor: user4,
                                                course: course3,
                                                order: 3,
                                                thumbnailUrl: '/images/womp1',
                                                comments: [],
                                        },
                                        {
                                                title: 'Introduction',
                                                description: "In this course we'll be learning what React is and how to use it to make awesome, reactive SPA's. We'll also look at how we can use Redux to help with our app's state management.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/y2mate.com+-+Complete+React+Tutorial+(%26+Redux+)+%231-+Introduction_OxIDLw0M-m0_240p.mp4',
                                                instructor: user4,
                                                course: course4,
                                                order: 1,
                                                thumbnailUrl: '/images/coff1',
                                                comments: [],
                                        },
                                        {
                                                title: 'How React Works',
                                                description: "in this React tutorial I'll be giving you a very birds-eye view of how React works behind the scenes.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/y2mate.com+-+Complete+React+Tutorial+(%26+Redux)++%232+-+How+React+Works_pKYiKbf7sP0_360p.mp4',
                                                instructor: user4,
                                                course: course4,
                                                order: 2,
                                                thumbnailUrl: '/images/coff1',
                                                comments: [],
                                        },
                                        {
                                                title: 'React Setup (with CDN)',
                                                description: "We will only use the React CDN for the first few lessons, to learn the basics. Then we'll move on to create full React apps with the Create React App package.",
                                                videoUrl: 'https://expand-dev.s3-us-west-1.amazonaws.com/y2mate.com+-+Complete+React+Tutorial+(%26+Redux)+%233+-+React+Setup+(with+CDN)_SAX6RMEFVM4_360p.mp4',
                                                instructor: user4,
                                                course: course4,
                                                order: 3,
                                                thumbnailUrl: '/images/coff1',
                                                comments: [],
                                        },
                                ]

                                Lesson.create(lessons_arr, function (err, lessons) {
                                        if (err) { console.log(err) }
                                        else {
                                                let lesson0 = lessons[0]._id;
                                                let lesson1 = lessons[1]._id;
                                                let lesson2 = lessons[2]._id;
                                                let lesson3 = lessons[3]._id;
                                                let lesson4 = lessons[4]._id;
                                                let lesson5 = lessons[5]._id;
                                                let lesson6 = lessons[6]._id;
                                                let lesson7 = lessons[7]._id;
                                                let lesson8 = lessons[8]._id;
                                                let lesson9 = lessons[9]._id;
                                                let lesson10 = lessons[10]._id;
                                                let lesson11 = lessons[11]._id;
                                                let lesson12 = lessons[12]._id;
                                                let lesson13 = lessons[13]._id;
                                                let lesson14 = lessons[14]._id;
                                                courses[0].lessons = [lesson0, lesson1, lesson2];
                                                courses[1].lessons = [lesson3, lesson4, lesson5];
                                                courses[2].lessons = [lesson6, lesson7, lesson8];
                                                courses[3].lessons = [lesson9, lesson10, lesson11];
                                                courses[4].lessons = [lesson12, lesson13, lesson14];
                                                courses[0].save();
                                                courses[1].save();
                                                courses[2].save();
                                                courses[3].save();
                                                courses[4].save();

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
                                                                text: "This video should help explain.",
                                                                lesson: lesson1,
                                                                timestamp: 22,
                                                                videoUrl: '/responses/111'
                                                        },
                                                        {
                                                                author: user3,
                                                                text: "Those potatoes have SO MUCH dirt on them. I wouldn't eat them if I were you.",
                                                                lesson: lesson0,
                                                                timestamp: 5,
                                                        },
                                                        {
                                                                author: user5,
                                                                text: "That looks like Boise! I moved there with Mrs. Potato Head back in the day during the great potato famine.",
                                                                lesson: lesson0,
                                                                timestamp: 55,
                                                        },
                                                ]

                                                Comment.create(comments_arr, function (err, comments) {
                                                        if (err) { console.log(err) }
                                                        else {
                                                                let comment0 = comments[0]._id;
                                                                let comment1 = comments[1]._id;
                                                                let comment2 = comments[2]._id;
                                                                let comment3 = comments[3]._id;
                                                                let comment4 = comments[4]._id;

                                                                lessons[0].comments = [comment0, comment3, comment4];
                                                                lessons[1].comments = [comment1, comment2];
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
                                                                                author: user5,
                                                                                text: "I believe 'potat' is the accepted word now.",
                                                                                parent: comment0,
                                                                        },
                                                                        {
                                                                                author: user1,
                                                                                text: "See this video for thorough instruction on doing the twist.",
                                                                                parent: comment1,
                                                                                videoUrl: '/newResponseVideoHere',
                                                                        },
                                                                        {
                                                                                author: user3,
                                                                                text: "I think their eyes are more like the eye of a needle, or the eye of a storm. Totally fictional.",
                                                                                parent: comment0,
                                                                        },
                                                                        {
                                                                                author: user5,
                                                                                text: "Watch me now, hey, work, work.",
                                                                                parent: comment1,
                                                                        },
                                                                        {
                                                                                author: user3,
                                                                                text: "I hear Boise is beautiful this time of year.",
                                                                                parent: comment2,
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
                                                                                let response5 = responses[5]._id;
                                                                                let response6 = responses[6]._id;

                                                                                comments[0].responses = [response0, response1, response2, response4];
                                                                                comments[1].responses = [response3, response5];
                                                                                comments[2].responses = [response6];
                                                                                comments[0].save();
                                                                                comments[1].save();
                                                                                comments[2].save();
                                                                                
                                                                                users[0].responses = [response0, response3];
                                                                                users[1].responses = [response1];
                                                                                users[2].responses = [response4, response6];
                                                                                users[4].responses = [response2, response5];
                                                                                users[0].save();
                                                                                users[1].save();
                                                                                users[2].save();
                                                                                users[4].save();
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