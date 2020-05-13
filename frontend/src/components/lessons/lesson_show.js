import React from "react";
import "../../stylesheets/lesson.css"
import Comment from './comments/comment'
import CommentHeatmap from './comments/comment_heatmap'
class LessonShow extends React.Component{
    constructor(props){
        super(props)
        
    }

    // componentDidMount(){
    //     this.props.getLesson(this.props.match.params.id)
    // }

    render(){
      if (!this.props.lesson) return null;
        return (
          <div className='lesson-show-page'>
            <video className='video-tag' controls>
              <source src='https://expand-dev.s3-us-west-1.amazonaws.com/Rick+Astley+-+Never+Gonna+Give+You+Up+(Video).mp4'
              type="video/mp4" />
            </video>
            <CommentHeatmap/>
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