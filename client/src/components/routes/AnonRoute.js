import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';

const AnonRoute = (props) => {
  console.log(props)
  const { isLoggedIn, render ,user, ...rest} = props
  return (
    <>
    {!isLoggedIn ?  <Route render={render} {...rest}/> : <Redirect to="/private"/>}  
    </>
  )
}

export default withAuth(AnonRoute)