import React from 'react';
import { withRouter } from 'react-router-dom';
import '../../stylesheets/session.css'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            password2: '',
            instructor: false,
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        this.setState({ errors: nextProps.errors })
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const {email, firstName, lastName, password, password2} = this.state;
        let user = {
            email,
            firstName,
            lastName,
            password,
            password2,
            instructor: this.state.instructor
        };
        this.props.signup(user, this.props.history);
    }

    renderErrors() {
        return (
            <ul className="errors">
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="form-container">
                <div className="bg-session-image"></div>
                <div className="promo-text">
                    Expand your knowledge
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form">
                        <h1>Welcome to Expand</h1>
                        <br />
                        <input type="text"
                            value={this.state.firstName}
                            onChange={this.update('firstName')}
                            placeholder="First name"
                        />
                        <br />
                        <input type="text"
                            value={this.state.lastName}
                            onChange={this.update('lastName')}
                            placeholder="Last name"
                        />
                        <br />
                        <input type="email"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br />
                        <input type="password"
                            value={this.state.password2}
                            onChange={this.update('password2')}
                            placeholder="Confirm Password"
                        />
                        <br />
                        <div className="status">
                            <h3>Select one:</h3>
                            <div className="status-options">
                                <label><input type="radio"
                                    name="status"
                                    value={false}
                                    onChange={this.update('instructor')}
                                    checked
                                />Student</label>
                                <label><input type="radio"
                                    name="status"
                                    value={true}
                                    onChange={this.update('instructor')}
                                />Instructor</label>
                            </div>
                        </div>
                        <br />
                        <input className="button" type="submit" value="Submit" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);