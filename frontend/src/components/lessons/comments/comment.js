import React from 'react';
import '../../../stylesheets/lesson.css';
import Response from './response';
Number.prototype.pad = function (size) {
  let s = String(this);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
};
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: false, text: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  handleDelete() {
    this.props.deleteComment().then(() => this.props.getLesson());
  }

  handleSubmit(event) {
    event.preventDefault();
    this.toggleButton();
    const { text, selectedFile } = this.state;
    if (this.state.text) {
      const data = new FormData();
      if (this.state.selectedFile) {
        data.append('file', selectedFile);
      }
      data.append('text', text);
      data.append('author', this.props.currentUserId);
      data.append('parent', this.props.comment._id);
      console.log(data);
      this.props
        .createResponse(data)
        .then(() => this.props.getLesson())
        .then(() => this.setState({ form: false, text: '' }));
    } else {
      this.setState({ form: false, text: '' });
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
    console.log(this.state);
  }

  handleSelectedFile(e) {
    e.preventDefault();
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader(e.target);
    if (file) fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      this.setState({
        selectedFile: file,
      });
    };
  }

  toggleButton() {
    const formButton = document.getElementById('replybutton');
    if (formButton.disabled) {
      formButton.disabled = false;
    } else {
      formButton.disabled = true;
    }
    formButton.classList.toggle('no-button');
  }

  render() {
    return (
      <div className="comment-group">
        <div className="comment">
          <div>
            {Math.floor(this.props.comment.timestamp / 60).pad(2)}:
            {Math.ceil(this.props.comment.timestamp % 60).pad(2)}
          </div>
          {this.props.comment.author.instructor ? (
            <div className="response-info-instructor-name">
              {this.props.comment.author.firstName}{' '}
              {this.props.comment.author.lastName}
            </div>
          ) : (
            <div className="response-info-name">
              {this.props.comment.author.firstName}{' '}
              {this.props.comment.author.lastName}
            </div>
          )}
          <div className="response-info-text">{this.props.comment.text}</div>
          <div className="reply-buttons">
            {this.state.form ? (
              <form className="form1">
                <textarea
                  className="comment-input"
                  onChange={this.handleChange}
                  value={this.state.text}
                />
                <label>
                  Expand with a video:
                  <input
                    id="file"
                    type="file"
                    onChange={this.handleSelectedFile}
                  />
                </label>
                <button
                  className="comment-button"
                  id="replybutton"
                  onClick={this.handleSubmit}
                >
                  Reply
                </button>
              </form>
            ) : (
              <button
                className="comment-button"
                onClick={() => this.setState({ form: true })}
              >
                Reply
              </button>
            )}
            <button className="delete-button" onClick={this.handleDelete}>
              Delete
            </button>
          </div>
        </div>
        {this.props.comment.responses
          ? this.props.comment.responses.map((response, idx) => (
              <Response
                key={`response-${idx}`}
                response={response}
                deleteResponse={() => this.props.deleteResponse(response._id)}
                getLesson={this.props.getLesson}
              />
            ))
          : null}
      </div>
    );
  }
}

export default Comment;
