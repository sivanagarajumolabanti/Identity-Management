import axios from 'axios'

export const register = newUser => {
  return axios
    .post('entity/register', {
      
      email: newUser.email,
      password: newUser.password,
      owner: newUser.owner,
      usage_plan: newUser.usage_plan,
      API_key: newUser.API_key
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('entity/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}



export const getProfile = user => {
  return axios
    .get('entity/profile', {
      headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

// export const getUser = id => {
//   return axios
//     .get(`users/profile/${id}`)
//     .then(response => {
//       return response
//     })
//     .catch(err => {
//       return err
//     })
// }