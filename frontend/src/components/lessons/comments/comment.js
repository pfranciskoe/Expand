import React from "react";
import "../../../stylesheets/lesson.css"
import Response from './response';

class Comment extends React.Component{
    constructor(props){
        super(props);
        this.state={form: false, text:''}
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleChange=this.handleChange.bind(this)
    }
    handleSubmit(event){
        event.preventDefault()
        if (this.state.text) {
        const resp = {
            author: this.props.currentUserId,
            text: this.state.text,
            parent: this.props.comment._id
        }
        console.log(resp)
        this.props.createResponse(resp)
        .then(()=>this.setState({form:false}))} else {
        this.setState({ form: false }) }
    }
    handleChange(event){
        this.setState({text: event.target.value})
        console.log(this.state)
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
                                <button className='comment-button' onClick={this.handleSubmit}>Reply</button>
                        </form>
                        :
                            <button className='comment-button' onClick={()=>this.setState({form:true})}>Reply</button>
                        }
                    </div>
                </div>
                {this.props.comment.responses ? this.props.comment.responses.map((response, idx) => (
                    <Response key={`response-${idx}`} response={response} />)
                ) : null}
            </div>
        )
    }
}

export default Comment;