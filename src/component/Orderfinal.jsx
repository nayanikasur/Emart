import React from 'react'
import { NavLink } from 'react-router-dom'

const Orderfinal = () => {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center m-5 p-5'>
        <h1 className='m-2'>ORDER CONFRIMED</h1>
        <h2 className='m-5'> THANK YOU FOR SHOPPING !! </h2>
        <NavLink to='/' className="btn btn-dark ms-2 px-3 py-2 mx-5">Continue shopping </NavLink>
    </div>
  )
}

export default Orderfinal