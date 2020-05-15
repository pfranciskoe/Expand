import React from "react";
import "../../stylesheets/lesson.css"
import Comment from './comments/comment'
import CommentHeatmap from './comments/comment_heatmap'
class LessonShow extends React.Component{
    constructor(props){
        super(props)
        this.state={loading:true, loading2:true, text:'', form:false}
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }

    componentDidMount(){
        this.props.getLesson(this.props.match.params.id).then(()=>this.setState({loading:false})).then(()=>{
        const vid = document.getElementsByClassName('video-tag')[0]
          vid.onloadedmetadata = () => {
          this.vid = vid
          this.vidLength = Math.floor(vid.duration)
          this.setState({ loading2: false})
        }
        })
    }
  handleSubmit(event) {
    event.preventDefault()
    if (this.state.text) {
      const resp = {
        author: this.props.currentUserId,
        text: this.state.text,
        lesson: this.props.lesson._id,
        timestamp: this.vid.currentTime
      }
      this.props.createComment(resp)
        .then(() => this.setState({ form: false, loading2:true}))
        .then(
          ()=>this.props.getLesson(this.props.match.params.id)
        ).then(()=>this.setState({loading2:false}))
    } else {
      this.setState({ form: false })
    }
  }
  handleChange(event) {
    this.setState({ text: event.target.value })
  }
    render(){
      if (this.state.loading === true) {
        return(
          <div></div> 
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
              <p className='lesson-info-instructor'>
                {this.props.lesson.instructor.firstName} {this.props.lesson.instructor.lastName}
                </p>
              <p className='lesson-info-desc'>{this.props.lesson.description}</p>
              <div className='comment-buttons'>
              {this.state.form
                ?
                <form>
                  <textarea className='comment-input' onChange={this.handleChange} value={this.state.text} />
                  <button className='comment-button' onClick={this.handleSubmit}>Submit</button>
                </form>
                :
                <button className='comment-button' onClick={() => this.setState({ form: true })}>Comment</button>
              }
              </div>
            </div>
            <div className='comment-box'>
              {Object.values(this.props.lesson.comments).map((comment,idx)=>(
                <Comment key={`comment-${idx}`} comment={comment} createResponse={this.props.createResponse}
                  currentUserId={this.props.currentUserId} getLesson={() => this.props.getLesson(this.props.match.params.id)}
                  deleteComment={() => this.props.deleteComment(comment._id)} deleteResponse={this.props.deleteResponse}/>
              ))}
            </div>
          </div>
        )
      }
    }
}

export default LessonShow;