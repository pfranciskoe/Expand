import React from "react";
import "../../../stylesheets/lesson.css"
import Response from './response';

class Comment extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props.comment);
    }
    render(){
        return(
            <div className='comment-group'>
                <div className='comment'>
                    <p>{Math.floor(this.props.comment.timestamp / 60)}:{Math.ceil(this.props.comment.timestamp % 60)}</p>
                    <p>{this.props.comment.author}</p>
                    <p>{this.props.comment.text}</p>
                </div>
                {this.props.comment.response ? Object.values(this.props.comment.resonse).map(((response, idx) => (
                    <Response />
                ))) : null}
            </div>
        )
    }
}

export default Comment;