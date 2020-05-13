const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const users = require("./routes/api/users");
const courses = require('./routes/api/courses')
const lessons = require('./routes/api/lessons')
const comments = require('./routes/api/comments')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const passport = require('passport')
app.use(passport.initialize());
require('./config/passport')(passport);

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to MongoDB successfully"))
    .catch(err => console.log(err));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`)); 
app.use("/api/users", users);
app.use('/api/courses', courses)
app.use('/api/lessons', lessons)
app.use('/api/comments', comments)
