import React from 'react';
import { Link } from 'react-router-dom';

class CourseShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleEnroll = this.handleEnroll.bind(this);
    this.handleUnroll = this.handleUnroll.bind(this);
    this.openConfirmation = this.openConfirmation.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
    this.removeLessonFromCourse = this.removeLessonFromCourse.bind(this);
    this.state = {
      enrolled: this.checkEnrollment(),
      chooseToDelete: '',
    };
  }

  componentDidMount() {
    this.props.getCourse(this.props.match.params.id);
    this.props.fetchUser(this.props.currentUserId);
    window.scrollTo(0, 0);
  }

  /* handle enrollment - start */

  handleEnroll() {
    const students = [];
    this.props.course.students.forEach((student) => {
      students.push(student._id);
    });
    students.push(this.props.currentUserId);
    const newCourse = { ...this.props.course };
    newCourse.students = students;

    this.props.updateCourse(newCourse);
    this.addCourseToStudent();
    this.setState({ enrolled: true });
  }

  addCourseToStudent() {
    const courses = [];
    this.props.user.courses.forEach((course) => {
      courses.push(course._id);
    });
    courses.push(this.props.match.params.id);
    const newUser = { ...this.props.user };
    newUser.courses = courses;
    this.props.updateUser(newUser);
  }

  removeCourseFromStudent() {
    const courses = [];
    this.props.user.courses.forEach((course) => {
      if (course._id !== this.props.match.params.id) {
        courses.push(course._id);
      }
    });
    const newUser = { ...this.props.user };
    newUser.courses = courses;
    this.props.updateUser(newUser);
  }

  handleUnroll() {
    const students = [];
    this.props.course.students.forEach((student) => {
      if (student._id !== this.props.currentUserId) {
        students.push(student._id);
      }
    });

    const newCourse = { ...this.props.course };
    newCourse.students = students;

    this.props.updateCourse(newCourse);
    this.removeCourseFromStudent();
    this.setState({ enrolled: false });
  }

  checkEnrollment() {
    if (!this.props.user) return null;
    if (this.props.user.instructor) return false;
    let enrolled = false;
    enrolled = this.props.user.courses.some(
      (course) => course._id === this.props.match.params.id
    );
    return enrolled;
  }
  /* handle enrollment - end */

  /* delete lesson - start */
  handleDelete(id) {
    return (e) => {
      e.preventDefault();
      this.props.deleteLesson(id);
      this.removeLessonFromCourse(id);
      this.closeConfirmation(e);
    };
  }

  openConfirmation(i) {
    return (e) => {
      e.preventDefault();
      this.setState({ chooseToDelete: `${i}` });
    };
  }

  closeConfirmation(e) {
    e.preventDefault();
    this.setState({ chooseToDelete: '' });
  }

  removeLessonFromCourse(id) {
    const lessons = [];
    const { course, updateCourse } = this.props;
    course.lessons.forEach((lesson) => {
      if (lesson._id !== id) lessons.push(lesson);
    });
    const newCourse = { ...course };
    newCourse.lessons = lessons;
    updateCourse(newCourse);
  }

  confirmToDelete() {
    const { chooseToDelete } = this.state;
    const { course } = this.props;
    if (chooseToDelete) {
      let chosenLesson = course.lessons[chooseToDelete];
      return (
        <div className="modal-back" onClick={this.closeConfirmation}>
          <div className="modal-interior" onClick={(e) => e.stopPropagation()}>
            <h2>Delete "{chosenLesson.title}"?</h2>
            <p>This change will be permanent!</p>
            <div className="delete-options">
              <button onClick={this.handleDelete(chosenLesson._id)}>
                Delete
              </button>
              <button onClick={this.closeConfirmation}>Keep</button>
            </div>
          </div>
        </div>
      );
    }
  }

  /* delete lesson - end */

  render() {
    if (!this.props.course) return null;
    if (!this.props.user) return null;

    const { students, lessons, instructor } = this.props.course;
    const buttonDiv = this.state.enrolled ? (
      <button id="enroll" onClick={this.handleUnroll}>
        Unenroll
      </button>
    ) : (
      <button id="enroll" onClick={this.handleEnroll}>
        Enroll
      </button>
    );

    return (
      <div className="show-box">
        {this.confirmToDelete()}
        <div className="info">
          <h1 className="course-title">{this.props.course.title}</h1>
          <p className="course-author">{`By ${instructor.firstName} ${instructor.lastName}`}</p>
          <div className="course-divider-1"></div>
          <p className="course-description-header">Course Description:</p>
          <p className="course-description">{this.props.course.description}</p>
          {this.props.user.instructor ? null : buttonDiv}
          <div className="course-divider-2"></div>
        </div>
        <div className="course-content">
          <div className="lesson-list">
            <h2>Lessons</h2>
            {this.props.currentUserId === instructor._id ? (
              <Link to={`/courses/${this.props.course._id}/lessons/new`}>
                Add a lesson
              </Link>
            ) : null}
            <ol>
              {lessons.map((lesson, i) => (
                <div key={i} className="lesson-list-item-box">
                  <Link to={`/lessons/${lesson._id}`}>
                    <li className="lesson-list-item" key={`${i}`}>
                      {lesson.title}
                    </li>
                  </Link>
                  {this.props.currentUserId === instructor._id ? (
                    <button
                      id="trash-icon"
                      className="trash-icon"
                      onClick={this.openConfirmation(i)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  ) : null}
                </div>
              ))}
            </ol>
          </div>
          <div className="student-list">
            <h2>Enrollment List</h2>
            <span>
              {students.map((student, i) =>
                student ? (
                  <li
                    key={student._id}
                    className="student-name"
                  >{`${student.firstName} ${student.lastName}`}</li>
                ) : null
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CourseShow;
