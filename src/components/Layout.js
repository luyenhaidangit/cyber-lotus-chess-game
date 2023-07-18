import React from 'react'
import { Outlet } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';

const Layout = () => {
  return (
    <>
        <Outlet/>
    </>
  )
}

export default Layout