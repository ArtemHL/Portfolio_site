import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Dropdown = ({isLogged}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({type: 'LOGOUT'});
    navigate('/');
  }

  return (
    <div className='dropdown'>
                    <button className='GUI-link Account-link'>ACCOUNT</button>
                    <div className='dropdown-content'>
                       {isLogged ? (
                            <span> 
                              <Link to='/profile'>Profile</Link>
                              <Link to='/settings'>Settings</Link>
                              <button className = 'GUI-link' onClick={handleLogout}>
                                Logout
                              </button>
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