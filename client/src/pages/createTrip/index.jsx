import React, { useState } from 'react';
import withAuth from '../../hoc/withAuth.js';
import apiService from '../../services/api-service'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BACKEND_DOMAIN)

const CreateTrip = (props) => {
  const [ trip, setTrip ] = useState({
    from: '',
    to: '',
    startDate: '',
    endDate: '',
    needs1: 0,
    needs2: 0,
    needs3: 0,
  })
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const {from,to,startDate,endDate,needs1,needs2,needs3} = trip;
    console.log(trip);
    
    apiService.addOneTrip({
      from,
      to, 
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      needs1,
      needs2,
      needs3,
      owner: props.user._id
    })
      .then((res) => {
        if(res.status === 200){
          socket.emit('me')
          props.history.push('/')
        }
      })
      .catch( error => console.log(error) )
  }

  const handleChange = (event) => {  
    const {name, value} = event.target;
    setTrip({...trip,[name]: value});
  }

    return (
      <section className="traveller-trips-form">
        <div className="traveller-bg-header"></div>
        <div className="user-img-container" style={{backgroundImage:`url(${props.user.profilePic})` }}></div>
        <button className="trip-tab">Add new TRIP</button>
        <form onSubmit={(e)=>handleFormSubmit(e)}>
          <div>
            <div>
              <label htmlFor='from'>From:</label>
              <input id='from' type='text' name='from' value={trip.from} onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
              <label htmlFor=''>To:</label>
              <input id='to' type='text' name='to' value={trip.to} onChange={(e)=>handleChange(e)}/>
            </div>
          </div>
          <div>
            <div>
              <label htmlFor='startDate'>Start date:</label>
              <input id='startDate' type='date' name='startDate' value={trip.startDate} onChange={(e)=>handleChange(e)}/>
            </div>
            <div>
                <label htmlFor='endDate'>End date:</label>
                <input id='endDate' type='date' name='endDate' value={trip.endDate} onChange={(e)=>handleChange(e)} />
            </div>
          </div>
          <div className='needs-container'>
              <label htmlFor='needs'><p>Add special needs</p></label>
            <div>
              <label htmlFor='needs1'><input className='needs' id='needs1' type='checkbox' name='needs1' value={1000} onChange={(e)=>handleChange(e)}/>Help with luggage</label>
              <label htmlFor="needs2"><input className='needs' id='needs2' type='checkbox' name='needs2' value={500} onChange={(e)=>handleChange(e)} />Ride home</label>
              <label htmlFor="needs3"><input className='needs' id='needs3' type='checkbox' name='needs3' value={100} onChange={(e)=>handleChange(e)} />Language help</label>
            </div>
          </div>
          <div className='submit'>
            <p>The volunteer will get {Number(trip.needs1) + Number(trip.needs2) + Number(trip.needs3) + 1000} points</p>
            <input type='submit' value='Add new trip' /> 
          </div>
        </form>
      </section>
    )
  
}

export default withAuth(CreateTrip);