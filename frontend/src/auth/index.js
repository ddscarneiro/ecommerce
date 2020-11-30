import {API} from '../config'

export const signup = user => {
  return fetch(`${API}/signup`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .catch(err => console.log(err))
}

export const signin = user => {
  return fetch(`${API}/signin`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())
  .catch(err => console.log(err))
}

export const authenticate = (data, cb) => {
  if(typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
    cb()
  }
}

export const signout = (cb) => {
  if(typeof window != 'undefined') {
    localStorage.removeItem('jwt')
    cb()

    return fetch(`${API}/signout`, {
      method: 'get'
    })
    .then(response => {
      console.log('signout', response)
    }).catch(err => console.log(err))
  }
}

export const isAuthenticated = () => {
  if(typeof window == 'undefined') {
    return false
  }

  if(localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'))
  }

  return false
}