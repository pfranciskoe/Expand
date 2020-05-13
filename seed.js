const mongoURL = require('./config/keys');
const User = require('./models/User.js')
const Course = require('./models/Course.js')
const Lesson = require('./models/Lesson.js')
const Comment = require('./models/Comment.js')
const mongoose = require('mongoose')
mongoose.connect(mongoURL.mongoURI, {useNewUrlParser: true});

User.deleteMany({},(err)=>console.log(err))
Course.deleteMany({},(err)=>console.log(err))


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
                let user1 = users[0];
                let user2 = users[1];
                let user3 = users[2];
                const courses_arr = [
                    {
                            'instructor': `${user1._id}`,
                            'students': [ `${user3._id}`],
                            'title': 'Potato Farming',
                            'description': 'Self explanatory',
                            'lessons': []
                    }, {
                            'instructor': `${user1._id}`,
                            'students': [`${user2._id}`, `${user3._id}`],
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
                            user1.courses = [course0, course1]
                            user1.save();
                            user2.courses = [ course1]
                            user2.save();
                            user3.courses = [course0, course1]
                            user3.save();
                    }
                
                })
        
        }
        }

)

const lessons_arr = [
        {
                title: 'Plucking potatoes out of the ground',
                description: 'Something about roots, if potatoes even have roots idk',
                videoUrl: '/videos/1234',
                instructor: user1._id,
                course: course0,
                order: 1,
                thumbnailUrl: '/images/1234',
                comments: [],
        },
        {
                title: 'Cooking Potatoes',
                description: "Boil 'em, mash 'em, stick 'em in a stew",
                videoUrl: '/videos/6789',
                instructor: user1._id,
                course: course0,
                order: 2,
                thumbnailUrl: '/images/6789',
                comments: [],
        },
        {
                title: 'Step One: Get a Box',
                description: "Procurement can be difficult. Watch closely for 5 tips and tricks!",
                videoUrl: '/videos/boxvid1',
                instructor: user1._id,
                course: course1,
                order: 1,
                thumbnailUrl: '/images/boxvid1',
                comments: [],
        }
]

Lesson.create(lessons_arr);

const comments_arr = [
        {
                author: user2._id,
                text: "In this part you're talking about eyes, but I'm not sure potatoes are alive??",
                lesson: lesson1._id,
                timestamp: 64,
        },
        {
                author: user2._id,
                text: "You can mash potatoes, but can you do the twist?",
                lesson: lesson2._id,
                timestamp: 22,
        },
        {
                author: user1._id, //must be a teacher
                text: "You can mash potatoes, but can you do the twist?",
                lesson: lesson2._id,
                timestamp: 22,
                videoUrl: '/responses/111' //optional field for response video
        },
]

Comment.create(comments_arr);