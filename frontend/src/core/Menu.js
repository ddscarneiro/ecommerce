import React from 'react'
import {Link, withRouter} from 'react-router-dom'
import { signout, isAuthenticated } from '../auth'

const isActive = (history, path) => {
  if(history.location.pathname === path) {
    return {color: '#ff9900'}
  } 
  return {color: '#fff'}
}

const Menu = ({history}) => 
  <div>
    <ul className="nav nav-tabs bg-primary">
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
      </li>
      {!isAuthenticated() ? 
      <li className="nav-item"> 
        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
      </li>
       : 
       <li className="nav-item">
       <span className="nav-link" style={{cursor: 'pointer', color: 'white'}} onClick={() => signout(() => history.push('/'))}>Signout</span>
     </li>
     }
    </ul>
  </div>

  export default withRouter(Menu)