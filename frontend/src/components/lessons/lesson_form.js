import React from "react";

class LessonForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          fileLink: this.props.lesson.fileLink,
          title: this.props.lesson.title,
          description: this.props.lesson.description
        };
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    updateForm(field){
        return e => this.setState({[field]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.action(this.state);
        


    }

    render(){
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  type="text"
                  onChange={this.updateForm("fileLink")}
                  value={this.state.fileLink}
                />
              </label>

              <label>
                Title
                <input
                  type="text"
                  onChange={this.updateForm("title")}
                  value={this.state.title}
                />
              </label>

              <label>
                Description
                <input
                  type="text"
                  onChange={this.updateForm("description")}
                  value={this.state.description}
                />
              </label>

              <button type="submit">Submit</button>
            </form>

            
          </div>
        );
    }
}

export default LessonForm