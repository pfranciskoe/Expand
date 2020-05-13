import React from "react";

class LessonForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          fileLink: this.props.lesson.fileLink,
          title: this.props.lesson.title,
          description: this.props.lesson.description,
          selectedFile: null
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSelectedFile = this.handleSelectedFile.bind(this);
    }

    updateForm(field){
        return e => this.setState({[field]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("Submitting...")
        const {title, description, fileLink, selectedFile} = this.state;
        let result;
        if (this.props.formType === "Create Lesson"){
          const data = new FormData();
          data.append('file', selectedFile);
          data.append('description', description);
          data.append('title', title);
          result = data;
          console.log("Data:", data)
        } else {
          result = { title, description, fileLink };
        }
        this.props.action(result);
    }

    // handleSelectedFile = e => {
    //   e.preventDefault();
    //   const { description, title } = this.state;
    //   const data = new FormData();
    //   data.append('file', e.target.files[0]);
    //   data.append('description', description);
    //   data.append('title', title);
    //   this.setState({
    //     selectedFile: data
    //   });
    // };

    handleSelectedFile(e) {
      e.preventDefault();
      const file = e.currentTarget.files[0];
      const fileReader = new FileReader(e.target);
      fileReader.onloadend = () => {
        this.setState({
          selectedFile: file,
        });
      }
      if (file) fileReader.readAsDataURL(file);
    }

    render(){
        const {selectedFile, title, description, fileLink} = this.state;
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  type="file"
                  onChange={this.handleSelectedFile}
                  // value={selectedFile ? selectedFile.name : fileLink}
                />
              </label>

              <label>
                Title
                <input
                  type="text"
                  onChange={this.updateForm("title")}
                  value={title}
                />
              </label>

              <label>
                Description
                <input
                  type="text"
                  onChange={this.updateForm("description")}
                  value={description}
                />
              </label>

              <button type="submit">Submit</button>
            </form>

            
          </div>
        );
    }
}

export default LessonForm