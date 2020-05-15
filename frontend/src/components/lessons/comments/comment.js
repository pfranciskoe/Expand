import React from "react";
import "../../../stylesheets/lesson.css"
import Response from './response';

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state={form: false, text:''}
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleSelectedFile=this.handleSelectedFile.bind(this)
    }
    handleSubmit(event){
        event.preventDefault()
        if (this.state.text) {
        const resp = {
            author: this.props.currentUserId,
            text: this.state.text,
            parent: this.props.comment._id,
            videoUrl: this.state.selectedFile
        }
        console.log(resp)
        this.props.createResponse(resp).then(
        ()=> this.props.getLesson()
        )
        .then(()=>this.setState({form:false}))
       
    } else {
        this.setState({ form: false }) }
    }
    handleChange(event){
        this.setState({text: event.target.value})
        console.log(this.state)
    }
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
        return(
            <div className='comment-group'>
                <div className='comment'>
                    <div>{Math.floor(this.props.comment.timestamp / 60)}:{Math.ceil(this.props.comment.timestamp % 60)}</div>
                    <div>{this.props.comment.author.firstName} {this.props.comment.author.lastName}</div> 
                    <div>{this.props.comment.text}</div>
                    <div className='reply-buttons'>
                        {this.state.form 
                        ? 
                        <form>
                                <textarea className='comment-input' onChange={this.handleChange} value={this.state.text}/>
                                <label>
                                    Expand with a video:
                                    <input
                                        id="file"
                                        type="file"
                                        onChange={this.handleSelectedFile}
                                    />
                                </label>
                                <button className='comment-button' onClick={this.handleSubmit}>Reply</button>
                        </form>
                        :
                            <button className='comment-button' onClick={()=>this.setState({form:true})}>Reply</button>
                        }
                        <button className='delete-button' onClick={this.props.deleteComment}>Delete</button>
                    </div>
                </div>
                {this.props.comment.responses ? this.props.comment.responses.map((response, idx) => (
                    <Response key={`response-${idx}`} response={response} 
                    deleteResponse={()=>this.props.deleteResponse(response._id)}/>)
                ) : null}
            </div>
        )
    }
}

export default Comment;