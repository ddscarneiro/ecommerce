import React, {useState} from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {signup} from '../auth'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: [],
    success: false
  })

  const {name, email, password, error, success} = values

  const handleChange = input => event => {
    setValues({...values, error: [], [input]: event.target.value})
  } 

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error: [],})
    signup({name, email, password})
    .then(data => {
      if (data.err) {
        setValues({...values, error: data.err, success: false})
      } else {
        setValues({...values, name: '', email: '', password: '', error: [], success: true})
      }
    })
  }
  
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  )

  const showError = (err) => ( 
      <div className="alert alert-danger" style={{display: err ? '' : 'none'}}>
        {err}
      </div>
  )

  const listErrors = () => {
    if (error) {
      return error.map(err => showError(err))
    }
  }

  const showSuccess = () => (
    <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
      New account is created. Please <Link to="/signin">Signin</Link>
    </div>
  )

  return (
    <Layout title="Signup" description="Signup to Node React E-commerce App" className="container col-md-8 offset-md-2">
      {showSuccess()}
      {listErrors()}
      {signUpForm()}
    </Layout>
  )
}

export default Signup