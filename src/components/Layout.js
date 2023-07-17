import React from 'react'
import { Outlet } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
  return (
    <>
        <h3 className='d-flex justify-content-center pt-4 pb-2'>Game cờ caro</h3>
        <Outlet/>
    </>
  )
}

export default Layout