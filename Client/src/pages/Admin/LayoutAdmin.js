import { AdminSidebar } from 'components'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from 'utils'

const LayoutAdmin = () => {
  const {isLogin,current} = useSelector(state=>state.user)
  if(!isLogin || !current || +current.role === 1) return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <div className="flex w-full min-h-screen relative">
      <div className='min-w-[270px] max-w-[270px] top-0 bottom-0 fixed'>
        <AdminSidebar />
      </div>
      <div className='w-[270px]'></div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutAdmin