import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown = ({isLogged}) => {
  return (
    <div className='dropdown'>
                    <button className='GUI-link Account-link'>ACCOUNT</button>
                    <div className='dropdown-content'>
                       {isLogged ? (
                            <span> 
                              <Link to='/profile'>Profile</Link>
                              <Link to='/settings'>Settings</Link>
                              <Link to='/logout'>Logout</Link>
                            </span>
                        ) : (
                            <span> 
                              <Link to='/login'>Login</Link>
                              <Link to='/register'>Register</Link>
                            </span>
                        )}
                    </div>
                </div>
  )
}

export default Dropdown