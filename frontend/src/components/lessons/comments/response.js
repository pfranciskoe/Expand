import React from 'react';
import '../../../stylesheets/lesson.css';
class Response extends React.Component {
  constructor(props) {
    super(props);
    this.state = { video: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleToggle() {
    if (this.state.video) {
      this.setState({ video: false });
    } else {
      this.setState({ video: true });
    }
  }

  handleDelete() {
    this.props.deleteResponse().then(() => this.props.getLesson());
  }

  render() {
    return (
      <div className="response">
        <div className="response-info">
          {this.props.response.author.instructor ? (
            <p className="response-info-instructor-name">
              {this.props.response.author.firstName}{' '}
              {this.props.response.author.lastName}
            </p>
          ) : (
            <p className="response-info-name">
              {this.props.response.author.firstName}{' '}
              {this.props.response.author.lastName}
            </p>
          )}
          <p className="response-info-text">{this.props.response.text}</p>
        </div>
        {this.props.response.videoUrl ? (
          this.state.video ? (
            <button
              onClick={this.handleToggle}
              className="response-video-button"
            >
              &#9660;
            </button>
          ) : (
            <button
              onClick={this.handleToggle}
              className="response-video-button"
            >
              &#x25BA;
            </button>
          )
        ) : null}
        {this.state.video ? (
          <div className="response-video">
            <video
              src={this.props.response.videoUrl}
              controls="controls"
              autoPlay="autoPlay"
              type="video/mp4"
            />
          </div>
        ) : null}
        <button className="delete-button" onClick={this.handleDelete}>
          Delete
        </button>
      </div>
    );
  }
}
export default Response;
