import React from "react";
import "../../stylesheets/lesson.css"
import Comment from './comments/comment'
import CommentHeatmap from './comments/comment_heatmap'
class LessonShow extends React.Component{
    constructor(props){
        super(props)
        this.state={loading:true, loading2:true}
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id).then(()=>this.setState({loading:false})).then(()=>{
        const vid = document.getElementsByClassName('video-tag')[0]
          vid.onloadedmetadata = () => {
          this.vidLength = Math.floor(vid.duration)
          this.setState({ loading2: false})
        }
        })
    }
    render(){
      if (this.state.loading === true) {
        return(
          <div>LOADING</div> 
        )
      } else {
        return (
          <div className='lesson-show-page'>
            <video className='video-tag' controls>
              <source src={this.props.lesson.videoUrl}
              type="video/mp4" />
            </video>
            {this.state.loading2 == false ?
            <CommentHeatmap lesson={this.props.lesson} vidLength={this.vidLength}/> : null }
            <div className='lesson-info'>
              <p className='lesson-info-title'>{this.props.lesson.title}</p>
              <p className='lesson-info-desc'>{this.props.lesson.description}</p>
            </div>
            <div className='comment-box'>
              {Object.values(this.props.lesson.comments).map((comment,idx)=>(
                <Comment key={`comment-${idx}`} comment={comment}/>
              ))}
            </div>
          </div>
        )
      }
    }
}

export default LessonShow;