import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
// import { getUser } from './UserFunctions'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
        username: '',
        email: '',
        password: '',
        owner: '',
        usage_plan:'',
        API_key:'',
      // errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    // getUser(decoded.uid).then(res => {
    this.setState({
      username: decoded.username,
      email: decoded.email,
      owner: decoded.owner,
      usage_plan: decoded.usage_plan,
      API_key: decoded.API_key,
    })
  // })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>User Name</td>
                <td>{this.state.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Owner</td>
                <td>{this.state.owner}</td>
              </tr>
              <tr>
                <td>Usage plan</td>
                <td>{this.state.usage_plan}</td>
              </tr>
              <tr>
                <td>API key</td>
                <td>{this.state.API_key}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile