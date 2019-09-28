
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
      setTrips(tripsfrom)
    })
  })
  useEffect(()=>{
    if(props.user.userType !== 'volunteer'){
      props.history.push('/private');
    }
  },[props.history, props.user.userType])


  return (
    <>
    <section className="traveller-trips">
      <div className="traveller-bg-header"></div>
      <div className="user-img-container" style={{backgroundImage:`url(${props.user.profilePic})` }}></div>
    <button className="trip-tab">TRIPS</button>
    <article className="trip-card-container" ></article>
      {trips.length >0 
      ?
      (trips.map(trip => {
        return(
          <div className="trip-card-bg" key={trip._id}>
            <img src={trip.img} alt='city image'/>
            <div className="trip-card">
              <button className="trip-request">{trip.requests.length}</button>
              <p className="trip-card-from">{trip.from}</p>
              <p className="trip-card-to">{trip.to}</p>
              <hr></hr>
              <p className="trip-card-date">{trip.startDate} to {trip.endDate}</p>
              <ul>
              { trip.needs.length >0 ?
              trip.needs.map((need,i)=>{
                return (
                  <li key={i}>{need}</li>)
                })
                :<li>No special needs</li>
                }
              </ul>
            </div>
          </div>
        )
      }))
      :
      (<div>no hay </div>)}
      </section>
    </>
  )
}

export default withAuth(Em)
