import React from "react";
import "../../../stylesheets/lesson.css"
class Response extends React.Component {
    constructor(props) {
        super(props);
        this.state={video:false}
    }
    render() {
        return (
            <div className='response'>
                {/* {this.props.response.videoUrl ? */}
                <button className='response-video-button'>
                    &#x25BA;
                </button> 
                {/* // : null } */}
                <div className='response'>
                    <p>{this.props.response.author.firstName} {this.props.response.author.lastName}</p>
                    <p>{this.props.response.text}</p>
                </div>
                {this.state.video ?
                <div className='response-video'>
                    <video src={this.props.response.videoUrl} autoplay>

                    </video>
                </div>
                : null }
            </div>
        )
    }
}
export default Response;