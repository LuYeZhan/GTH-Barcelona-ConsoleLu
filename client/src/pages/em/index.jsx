
import React, {useState, useEffect} from 'react'
import withAuth from '../../hoc/withAuth'
import apiService from '../../services/api-service'
import io from 'socket.io-client'
import Card from '../../components/ui/card'
const socket = io(process.env.REACT_APP_BACKEND_DOMAIN)

const Em = (props) => {
  const [trips, setTrips] = useState([]);
  const [selectedTab,setSelectedTab] = useState(true)
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

  

 const HandleTabToogle =()=>{
  setSelectedTab(!selectedTab)
 } 
 const renderAlltrips = () =>{
  return(
  <article className="trip-card-container" >
  {trips.length >0 
  ?
  (trips.map(trip => {
    return(
      <Card 
      key={trip._id} 
      trip={
        {
          _id:trip._id,
          requests:trip.requests,
          startDate: trip.startDate,
          endDate: trip.endDate,
          to: trip.to,
          from: trip.from,
          img:trip.img,
          needs:trip.needs,
          thisAccepted:trip.thisAccepted,
        }
      }
      user={props.user._id}
      />
    )
  }))
  :
  (<div>No trips available</div>)}
  </article>
  )}
  return (
    <>
    <section className="traveller-trips">
      <div className="traveller-bg-header"></div>
      <div className="user-img-container" style={{backgroundImage:`url(${props.user.profilePic})` }}></div>
   
    
      <div className="trip-tab-volunteer-container">
        <button className={`trip-tab-volunteer ${selectedTab ? '' : "selected-tab" }`} onClick={HandleTabToogle}>ALL TRIPS</button>
        <button className={`trip-tab-volunteer ${selectedTab ? "selected-tab" :'' }`} onClick={HandleTabToogle}>MY TRIPS</button>
      </div>
      {renderAlltrips()}
      {renderAlltrips()}
      
      </section>
    </>
  )
}

export default withAuth(Em)
