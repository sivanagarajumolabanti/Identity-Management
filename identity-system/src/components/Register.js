import React, { Component } from 'react'
import { register } from './UserFunctions'
import FormValidator from './FormValidator';

class Register extends Component {
    constructor() {
        super()

        this.validator = new FormValidator([
            {
                field: 'username',
                method: 'isEmpty',
                validWhen: false,
                message: 'Enter full name.'
            },
            {
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'Enter valid email address.'
            },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Enter a password.'
            },

            {
                field: 'owner',
                method: 'isEmpty',
                validWhen: false,
                message: 'Enter a owner.'
            },

            {
                field: 'usage_plan',
                method: 'isEmpty',
                validWhen: false,
                message: 'Enter a usage_plan.'
            },
            {
                field: 'API_key',
                method: 'isEmpty',
                validWhen: false,
                message: 'Enter a API_key.'
            },
        ]);

        this.state = {
            // username: '',
            email: '',
            password: '',
            owner: '',
            usage_plan: '',
            API_key: '',
            errors: {},
            validation: this.validator.valid()
        }
        this.submitted = false;

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleInputChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    // handleFormSubmit = event => {
    //     event.preventDefault();
         
    //     const validation = this.validator.validate(this.state);
    //     this.setState({ validation });
    //     this.submitted = true;
         
    //     if (validation.isValid) {
    //     //reaches here if form validates successfully...
    //     }
    //     }


    // onChange(e) {
    //     this.setState({ [e.target.name]: e.target.value })
    // }
    handleFormSubmit(event) {
        event.preventDefault();
        const validation = this.validator.validate(this.state);
            this.setState({ validation });
            this.submitted = true;
            if (validation.isValid) {
                const newUser = {
                    // username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    owner: this.state.owner,
                    usage_plan: this.state.usage_plan,
                    API_key: this.state.API_key
                }
                register(newUser).then(res => {
                    this.props.history.push(`/login`)
                })
             }
   
    }
    
    render() {
        let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            <div className={validation.username.isInvalid && 'has-error'}>
                                <label htmlFor="username">User Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    placeholder="Enter your user name"
                                    value={this.state.username}
                                    onChange={this.handleInputChange}
                                />
                               
                                <span className="help-block" style={{color: "red"}}>{validation.username.message}</span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter your email name"
                                    value={this.state.email}
                                    onChange={this.handleInputChange}
                                />
                                <span className="help-block" style={{color: "red"}}>{validation.email.message}</span>
                            </div>

                            <div className={validation.password.isInvalid && 'has-error'}>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.handleInputChange}
                                />
                                <span className="help-block" style={{color: "red"}}>{validation.password.message}</span>
                            </div>

                            <div className={validation.owner.isInvalid && 'has-error'}>
                                <label htmlFor="owner">Owner</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="owner"
                                    placeholder="Enter owner"
                                    value={this.state.owner}
                                    onChange={this.handleInputChange}
                                />
                                <span className="help-block" style={{color: "red"}}>{validation.owner.message}</span>
                            </div>
                            <div className={validation.usage_plan.isInvalid && 'has-error'}>
                                <label htmlFor="usage_plan">Usage Plan</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="usage_plan"
                                    placeholder="usage_plan"
                                    value={this.state.usage_plan}
                                    onChange={this.handleInputChange}
                                />
                                <span className="help-block" style={{color: "red"}}>{validation.usage_plan.message}</span>
                            </div>
                            <div className={validation.API_key.isInvalid && 'has-error'}>
                                <label htmlFor="API_key">API key</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="API_key"
                                    placeholder="API_key"
                                    value={this.state.API_key}
                                    onChange={this.handleInputChange}
                                />
                                <span className="help-block" style={{color: "red"}}>{validation.API_key.message}</span><br></br>
                            </div>
                            <button onClick={this.handleFormSubmit}
                                type="submit"
                                className="btn btn-lg btn-primary btn-block"
                            >
                                Register!
              </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Register