const mongoURL = require('./config/keys');
const User = require('./models/User.js')
const Course = require('./models/Course.js')
const mongoose = require('mongoose')
mongoose.connect(mongoURL.mongoURI, {useNewUrlParser: true});

// const seeder = require('mongoose-seed');
// // Connect to MongoDB via Mongoose
// seeder.connect(address.mongoURI, function () {

//     // Load Mongoose models
//     seeder.loadModels([
//         './models/Course.js',
//         './models/User.js'
//     ]);

//     // Clear specified collections
//     seeder.clearModels(['Course', 'User'], function () {

//         // Callback to populate DB once collections have been cleared
//         seeder.populateModels(data, function () {
//             seeder.disconnect();
//         });

//     });
// });

// // Data array containing seed data - documents organized by Model


// const data = [
//     {
//         'model': 'User',
//         'documents': [
User.deleteMany({},console.log('deleted users'))
Course.deleteMany({},console.log('deleted courses'))
let user1 = 1;
User.create(
    {
        'firstName': 'Instructor',
        'lastName': 'Koe',
        'instructor': true,
        'email': 'peter@koe.com',
        'password': 'password',
        'courses': []
    }, (err, user) => {
        Course.create(
            {
                'instructor': `${user._id}`,
                'students': [`${user._id}`, `${user._id}`],
                'title': 'Potato Farming',
                'description': 'Self explanatory',
                'lessons': []
            },
        )
    }
)


const user2 = User.create(
    {
        'firstName': 'Student',
        'lastName': 'Koe2',
        'instructor': false,
        'email': 'peter1@koe.com',
        'password': 'password',
        'courses': []
    },
    (err, user) => { return user }
)
            
const user3 = User.create(
    {
        
        'firstName': 'Peter',
        'lastName': 'Koe3',
        'instructor': false,
        'email': 'peter2@koe.com',
        'password': 'password',
        'courses': []
    },
    (err, user) => { return user }
)


// const course1 = Course.create(
//     {
//         'instructor': `${user1._id}`,
//         'students': [`${user2._id}`, `${user3._id}`],
//         'title': 'Potato Farming',
//         'description': 'Self explanatory',
//         'lessons': []
//     },
// )

// const course2 = Course.create(
//     {
        
//         'instructor': `${user1._id}`,
//         'students': [`${user2._id}`, `${user3._id}`],
//         'title': 'Box Crushing',
//         'description': 'Less violent than it sounds',
//         'lessons': [],
//     },
// )