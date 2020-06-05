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
            photoUrl: this.props.thumbnailUrl
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
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

    handleSubmit(e) {
        e.preventDefault();
        const { title, description, instructor, photoUrl } = this.state;
        let course = {
          title,
          description,
          instructor,
          thumbnailUrl: photoUrl ? photoUrl : ""
        }
        if (this.props.formType === "Update Course") {
            course = { ...course, _id: this.props.course._id }
            this.props.action(course)
        }
        //validations
        this.props.action(course);
        this.setState({ success: true })
        this.props.history.push("/courses")
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
              ? <h1>Create a new course</h1> 
              : <h1>Update the course</h1>
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
              </div>

              <button className="button" type="submit">
                Submit
              </button>
            </form>
            )}
          </div>
        );
    }
}

export default withRouter(CourseForm);