import React from "react";

class LessonShow extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id)
    }

    render(){
      if (!this.props.lesson) return null;
        return (
          <div>
            <video width="320" height="240" controls>
              <source src={this.props.lesson.fileLink} type="video/mp4" />
            </video>
          </div>
        );
    }
}

export default LessonShow;