import React from 'react';
import '../../stylesheets/lesson-forms.css';
import { withRouter } from 'react-router-dom';

class LessonForm extends React.Component {
  constructor(props) {
    super(props);
    const {
      title,
      description,
      videoUrl,
      instructor,
      course,
      order,
      thumbnailUrl,
    } = this.props.lesson;
    this.state = {
      title,
      description,
      videoUrl,
      instructor,
      course,
      order,
      thumbnailUrl,
      selectedFile: null,
      errors: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
  }

  componentDidMount() {
    this.props.getCourse(this.props.match.params.courseId);
  }

  updateForm(field) {
    return (e) => this.setState({ [field]: e.target.value });
  }

  formValidations() {
    const { title, description, instructor, course, thumbnailUrl } = this.state;
    let fields = [title, description, instructor, course, thumbnailUrl];
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].length === 0) return false;
    }
    return true;
  }

  toggleButton() {
    let formButton = document.getElementById('form-submit');
    if (formButton.disabled) {
      formButton.disabled = false;
    } else {
      formButton.disabled = true;
    }
    formButton.classList.toggle('no-button');
    document.getElementById('spinner').classList.toggle('show-spinner');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.toggleButton();
    const {
      title,
      description,
      videoUrl,
      instructor,
      course,
      order,
      thumbnailUrl,
      selectedFile,
    } = this.state;
    let result;
    if (this.props.formType === 'Create Lesson') {
      const data = new FormData();
      data.append('file', selectedFile);
      data.append('title', title);
      data.append('description', description);
      data.append('videoUrl', videoUrl);
      data.append('instructor', instructor);
      data.append('course', course);
      data.append('order', order);
      data.append('thumbnailUrl', thumbnailUrl);
      result = data;
    } else {
      result = {
        title,
        description,
        videoUrl,
        instructor,
        course,
        order,
        thumbnailUrl,
      };
    }
    const newCourse = { ...this.props.course };
    const lessons = newCourse.lessons;
    if (this.formValidations() && selectedFile) {
      this.props.action(result).then((lesson) => {
        lessons.push(lesson.lesson.data);
        newCourse[lessons] = lessons;
        this.props.history.push(`/lessons/${lesson.lesson.data._id}`);
        this.props.updateCourse(newCourse);
      });
    } else {
      this.toggleButton();
      this.setState({ errors: true });
    }
  }

  handleSelectedFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader(e.target);
    fileReader.onloadend = () => {
      this.setState({
        selectedFile: file,
      });
    };
    if (file) fileReader.readAsDataURL(file);
  }

  showErrors() {
    if (this.state.errors) {
      return <div className="errors">Missing fields</div>;
    }
  }

  render() {
    const { title, description } = this.state;
    return (
      <div className="lesson-box">
        <form className="form" onSubmit={this.handleSubmit}>
          <h1>Create a new lesson</h1>

          <label>
            Title
            <br />
            <br />
            <input
              type="text"
              onChange={this.updateForm('title')}
              value={title}
            />
          </label>

          <label>
            Description
            <br />
            <br />
            <input
              type="text"
              onChange={this.updateForm('description')}
              value={description}
            />
          </label>

          <div className="upload-box">
            <label>
              Upload video:
              <input id="file" type="file" onChange={this.handleSelectedFile} />
            </label>
          </div>

          <button id="form-submit" className="button" type="submit">
            Submit
          </button>
          <div className="spinner">
            <img
              id="spinner"
              className=""
              src="https://expand-dev.s3-us-west-1.amazonaws.com/images/triangles.png"
              alt="Expand"
            />
          </div>
          {this.showErrors()}
        </form>
      </div>
    );
  }
}

export default withRouter(LessonForm);
