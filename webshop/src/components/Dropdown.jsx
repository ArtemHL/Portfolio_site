import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown = () => {
  return (
    <div className='dropdown'>
                    <button className='GUI-link Account-link'>ACCOUNT</button>
                    <div className='dropdown-content'>
                        <Link to='/profile'>Profile</Link>
                        <Link to='/settings'>Settings</Link>
                        <Link to='/logout'>Logout</Link>
                    </div>
                </div>
  )
}

export default Dropdown