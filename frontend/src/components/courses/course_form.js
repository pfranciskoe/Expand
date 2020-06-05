import React from "react";
import {withRouter} from "react-router-dom";

class CourseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.course.title,
            description: this.props.course.description,
            instructor: this.props.course.instructor,
            success: false,
            photoFile: null,
            photoUrl: this.props.thumbnailUrl,
            errors: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    showErrors() {
      if (this.state.errors) {
        return (
          <div className="errors">
            Missing fields
          </div>
        )
      }
    }

    deleteOption(){
      if (this.props.formType === "Update Course"){
        return (
          <button className="delete-button" onClick={this.handleDelete}>Delete</button>
        )
      }
    }

    checkFields(){
      const {title, description} = this.state;
      return title && description;
    }

    updateForm(field) {
      return e => this.setState({[field]: e.target.value })
    }

    hideBackground() {
      let back = document.getElementById("vid-thumb-background");
      if (back) back.remove();
    }

    handleFile(e) {
      e.preventDefault();
      const file = e.currentTarget.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({
          photoFile: file,
          photoUrl: fileReader.result
        });
      }
      this.hideBackground();
      if (file) fileReader.readAsDataURL(file);
    }

    handleDelete(e) {
      e.preventDefault();
      this.props.deleteCourse(this.props.course._id)
        .then(this.props.history.push("/courses"));
    }

    handleSubmit(e) {
      e.preventDefault();
      const { title, description, instructor, photoUrl, photoFile } = this.state;
      let result;
      const data = new FormData();
      data.append('file', photoFile);
      data.append('title', title);
      data.append('description', description);
      data.append('instructor', instructor);
      data.append('thumbnailUrl', photoUrl ? photoUrl : "https://expand-dev.s3-us-west-1.amazonaws.com/images/m-clouds.jpg");
      if (this.props.formType === "Update Course") {
        result = {
          title: title,
          description: description,
          instructor: instructor,
          _id: this.props.course._id
        }
      } else {
        result = data;
      }
      if (this.checkFields()) {
        this.props.action(result);
        this.setState({ success: true })
        this.props.history.push("/courses")
      } else {
        this.setState({ errors: true });
      }
    }

    render() {
        const { title, description, photoUrl } = this.state;
        const preview = photoUrl 
          ? <img id="image-preview" src={photoUrl} /> 
          : null;
        return (
          <div>
            {this.state.success 
            ? <h1>Your course is saved!</h1>
            :(
            <form className="form" onSubmit={this.handleSubmit}>
              {this.props.formType === "Create Course" 
              ? <h1>Create a New Course</h1> 
              : <h1>Update Course Details</h1>
              }
              <div className="form-details">
                <div className="course-details">
                  <label>
                    Title:
                    <br />
                    <br />
                    <input
                      type="text"
                      onChange={this.updateForm("title")}
                      value={title}
                    />
                  </label>

                  <label>
                    Description:
                    <br />
                    <br />
                    <textarea
                      rows="3"
                      onChange={this.updateForm("description")}
                      value={description}
                    />
                  </label>
                </div>
                {(this.props.formType === "Update Course") ? (null) : (
                  <div className="vid-thumb-box">
                    <input type="file" name="file-upload" id="file-upload" onChange={this.handleFile} />
                    <label htmlFor="file-upload">
                      <div id="vid-thumb-background">
                        <div className="vid-thumb-back">
                          <i className="fas fa-cloud-upload-alt"></i>
                          <p>Add thumbnail image (optional)</p>
                        </div>
                      </div>
                      <div className="vid-thumb-preview">
                        {preview}
                      </div>
                    </label>
                  </div>
                )}
              </div>
              <button className="button" type="submit">
                Submit
              </button>
              {this.deleteOption()}
              {this.showErrors()}
            </form>
            )}
          </div>
        );
    }
}

export default withRouter(CourseForm);