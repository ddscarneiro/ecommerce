import React, {useState} from 'react'
import Layout from '../core/Layout'
import {Redirect} from 'react-router-dom'
import {signin, authenticate} from '../auth'

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })

  const {email, password, error, loading, redirectToReferrer} = values

  const handleChange = input => event => {
    setValues({...values, error: '', [input]: event.target.value})
  } 

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error: '', loading: true})
    signin({email, password})
    .then(data => {
      if (data.err) {
        setValues({...values, error: data.err, loading: false})
      } else {
        authenticate(data, () => {
          setValues({...values, redirectToReferrer: true})
        })
      }
    })
  }
  
  const signinForm = () => (
    <form>
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

  const showError = () => ( 
      <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
        {error}
      </div>
  )

  const showLoading = () => (
    loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
  )

  const redirectUser = () => {
    if(redirectToReferrer) return <Redirect to='/' />
  }

  return (
    <Layout title="Signin" description="Signin to Node React E-commerce App" className="container col-md-8 offset-md-2">
      {showLoading()}
      {showError()}
      {signinForm()}
      {redirectUser()}
    </Layout>
  )
}

export default Signin