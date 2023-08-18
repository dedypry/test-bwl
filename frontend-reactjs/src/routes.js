import React from 'react'

const User = React.lazy(() => import('./views/users/user'))
const CreateUser = React.lazy(() => import('./views/users/addUser'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/user', name: 'user', element: User },
  { path: '/user/add', name: 'addUser', element: CreateUser },
  { path: '/user/update/:id', name: 'editUser', element: CreateUser },
]

export default routes
