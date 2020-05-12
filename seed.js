const mongoURL = require('./config/keys');
const User = require('./models/User.js')
const Course = require('./models/Course.js')
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



