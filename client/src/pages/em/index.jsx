
import React, {useState, useEffect} from 'react'
import CreateTrip from './../createTrip'
import withAuth from '../../hoc/withAuth'
import io from 'socket.io-client'

const Em = (props) => {

  useEffect(()=>{
    if(props.user.userType !== 'volunteer'){
      props.history.push('/private');
    }
  },[props.history, props.user.userType])


  return (
    <>
      
    </>
  )
}

export default withAuth(Em)
