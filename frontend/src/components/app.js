import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';

import CourseIndexContainer from './courses/course_index_container';
import NewCourseFormContainer from './courses/new_course_form_container'
import EditCourseFormContainer from './courses/edit_course_container'
import NewLessonContainer from "./lessons/new_lesson_container";
import LessonShowContainer from "./lessons/lesson_show_container";
import CourseShowContainer from "./courses/course_show_container";
import UserShowContainer from './users/user_show_container';

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      <ProtectedRoute path="/courses/:id/edit" component={EditCourseFormContainer}/>
      <ProtectedRoute path="/courses/new" component={NewCourseFormContainer} />
      <ProtectedRoute path="/courses/:courseId/lessons/new" component={NewLessonContainer} />
      <ProtectedRoute path="/courses/:id" component={CourseShowContainer} />
      <ProtectedRoute path="/courses" component={CourseIndexContainer} />
      <ProtectedRoute path="/lessons/:id" component={LessonShowContainer} />
      <ProtectedRoute path="/users/:userId" component={UserShowContainer} />
      <Route exact path="/" component={MainPage} />
    </Switch>
  </div>
);

export default App;