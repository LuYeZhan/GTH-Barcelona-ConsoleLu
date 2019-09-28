
import React, {useState, useEffect} from 'react'
import CreateTrip from './../createTrip'
import withAuth from '../../hoc/withAuth'
import apiService from '../../services/api-service'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BACKEND_DOMAIN)

const Em = (props) => {
  const [trips, setTrips] = useState([]);

  useEffect(()=>{
    socket.emit('me');
    apiService.getAllTrips()
    .then(res =>{
      setTrips(res.data.listOfTrips)
    })
  },[]);
  useEffect(()=>{
    socket.on('me', tripsfrom => {
      console.log(tripsfrom, 'he entrado')
    })
  })
  useEffect(()=>{
    if(props.user.userType !== 'volunteer'){
      props.history.push('/private');
    }
  },[props.history, props.user.userType])


  return (
    <>
      {trips.length >0 ?
      (<div>si hay </div>)
      :
      (<div>no hay </div>)}
    </>
  )
}

export default withAuth(Em)
