import React from "react";

class CourseForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.course.title,
            description: this.props.course.description,
            instructor: this.props.course.instructor,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateForm(field) {
        return e => this.setState({ [field]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.formType === "Update Course") {
            const course = { ...this.state, _id: this.props.course._id }
            this.props.action(course)
        }
        this.props.action(this.state);
    }

    render() {
        return (
          <div>
            <form className="form" onSubmit={this.handleSubmit}>
              {this.props.formType === "Create Course" 
              ? <h1>Create a new course</h1> 
              : <h1>update the course</h1>
              }
              <label>
                Title:
                <br />
                <br />

                <input
                  type="text"
                  onChange={this.updateForm("title")}
                  value={this.state.title}
                />
              </label>

              <label>
                Description:
                <br />
                <br />
                <textarea
                  rows="3"
                  onChange={this.updateForm("description")}
                  value={this.state.description}
                />
              </label>

              <button className="button" type="submit">
                Submit
              </button>
            </form>
          </div>
        );
    }
}

export default CourseForm;