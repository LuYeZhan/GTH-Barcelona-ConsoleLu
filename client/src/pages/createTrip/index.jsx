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
    needs: ''
  })
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const {from,to,startDate,endDate,needs} = trip;
    apiService.addOneTrip({
      from,
      to, 
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      needs,
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
        <form onSubmit={(e)=>handleFormSubmit(e)}>
          <div>
            <label htmlFor='from'>From:</label>
            <label htmlFor=''>To:</label>
          </div>
          <div>
            <input id='from' type='text' name='from' value={trip.from} onChange={(e)=>handleChange(e)}/>
            <input id='to' type='text' name='to' value={trip.to} onChange={(e)=>handleChange(e)}/>
          </div>
          <div>
            <label htmlFor='startDate'>Start date:</label>
            <label htmlFor='endDate'>End date:</label>
          </div>
          <div>
            <input id='startDate' type='date' name='startDate' value={trip.startDate} onChange={(e)=>handleChange(e)}/>
            <input id='endDate' type='date' name='endDate' value={trip.endDate} onChange={(e)=>handleChange(e)} />
          </div>
          <div>
            <label htmlFor='needs'>What's your needs:</label>
            <input id='endDate' type='date' name='endDate' value={trip.endDate} onChange={(e)=>handleChange(e)} />
          </div>
          <input type='submit' value='Add trip' /> 
        </form>
    )
  
}

export default withAuth(CreateTrip);