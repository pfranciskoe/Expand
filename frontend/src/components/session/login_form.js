import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/session.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/courses');
    }
    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return (e) =>
      this.setState({
        [field]: e.currentTarget.value,
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.login(user);
  }

  handleDemo(e) {
    e.preventDefault();
    const demouser = {
      email: 'demo@user.com',
      password: 'password',
    };
    this.props.login(demouser);
  }

  renderErrors() {
    return (
      <ul className="errors">
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="form-container">
        <div className="bg-session-image"></div>
        <div className="promo-text">Expand your learning experience</div>
        <form onSubmit={this.handleSubmit}>
          <div className="form">
            <h1>Log In</h1>
            <br />
            <input
              type="text"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <br />
            <input className="button" type="submit" value="Submit" />
            <input
              className="button"
              id="demo"
              type="submit"
              onClick={this.handleDemo}
              value="Demo"
            />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
