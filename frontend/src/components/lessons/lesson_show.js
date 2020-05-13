import React from "react";
import "../../stylesheets/lesson.css"
import Comment from './comments/comment'
import CommentHeatmap from './comments/comment_heatmap'
class LessonShow extends React.Component{
    constructor(props){
        super(props)
        this.state={loading:true}
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id)
    }

    render(){
      if (!this.props.lesson) return null;
        return (
          <div className='lesson-show-page'>
            <video className='video-tag' controls>
              <source src={this.props.lesson.videoUrl}
              type="video/mp4" />
            </video>
            <CommentHeatmap lesson={this.props.lesson}/>
            <div className='comment-box'>
              <Comment/>
              <Comment/>
              <Comment/>
              <Comment/>
            </div>
          </div>
        );
    }
}

export default LessonShow;