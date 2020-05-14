import React from "react";
import "../../../stylesheets/lesson.css"
class Response extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='response'>
                <p>{this.props.response.author.firstName} {this.props.response.author.lastName}</p>
                <p>{this.props.response.text}</p>
            </div>
        )
    }
}
export default Response;