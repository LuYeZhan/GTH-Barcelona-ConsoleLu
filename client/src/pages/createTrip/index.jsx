import React, { useState, useRef } from 'react';
import withAuth from '../../hoc/withAuth.js';
import apiService from '../../services/api-service'
import tequilaApiService from '../../services/tequilla-api-service'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BACKEND_DOMAIN)

const CreateTrip = (props) => {
  const [ trip, setTrip ] = useState({
    from: '',
    fromtoapi:[],
    to: '',
    totoapi:[],
    startDate: '',
    endDate: '',
    needs1: 0,
    needs2: 0,
    needs3: 0,
  })
const [isFrom, setIsFrom] = useState(false)
const [isTo, setIsTo] = useState(false)
const enableNeeds1 = useRef(false)
const enableNeeds2 = useRef(false)
const enableNeeds3 = useRef(false)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const {from,to,startDate,endDate,needs1,needs2,needs3} = trip;
    apiService.addOneTrip({
      from,
      to, 
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      needs1: enableNeeds1.current,
      needs2: enableNeeds2.current,
      needs3: enableNeeds3.current,
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
    let {name, value} = event.target;

    if(name === 'needs1'){
        enableNeeds1.current = !enableNeeds1.current
    }else if(name === 'needs2'){
      enableNeeds2.current = !enableNeeds2.current
    }else if(name === 'needs3'){
      enableNeeds3.current = !enableNeeds3.current
    }
    
    if(name !== 'needs1' || name !== 'needs2' || name !== 'needs3'){
      setTrip({...trip,[name]: value});
    }
  }

  const handleSearch = (e, tripStr) => {
    let {name, value} = e.target
    if(tripStr === 'from'){
      if(value.length > 3){
        tequilaApiService.getIATA(value)
        .then(res => {
          setTrip({...trip, fromtoapi: res.data.locations})
        })
      }
    }else{
      console.log(trip)
      if(value.length > 3){
        tequilaApiService.getIATA(value)
        .then(res => {
          setTrip({...trip, totoapi: res.data.locations})
        })
      }
    }
  }
  const handleSelectCity = (city, tripstr) => {
    if(tripstr === 'from'){
      setIsFrom(true);
      setTrip({...trip, from: city})
    }else{
      setIsTo(true);
      setTrip({...trip, to: city})
    }
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
              {!isFrom ?
              <input id='from' type='text' name='from' value={trip.from} autoComplete='off' onKeyUp={e => handleSearch(e, 'from')} onChange={(e)=>handleChange(e)}/>
              :
              <input id='from' type='text' name='from' value={trip.from} autoComplete='off'  onChange={(e)=>handleChange(e)} readOnly/>
              }
              {!isFrom &&
              <ul>
              {trip.fromtoapi.length > 0 
              ? (trip.fromtoapi.map(e=> {
                return <li onClick={()=> handleSelectCity(e.id, 'from')} key={e.id}>{e.name}</li>
              }))
              :''}
              </ul>
              }
            </div>
            <div>
              <label htmlFor=''>To:</label>
              {!isTo ?
              <input id='to' type='text' name='to' value={trip.to} autoComplete='off' onKeyUp={e => handleSearch(e, 'to')} onChange={(e)=>handleChange(e)}/>
              :
              <input id='to' type='text' name='to' value={trip.to} autoComplete='off' onChange={(e)=>handleChange(e)} readOnly/>
              }
              {!isTo &&
              <ul>
              {trip.totoapi.length > 0 
              ? (trip.totoapi.map(e=> {
                return <li onClick={()=> handleSelectCity(e.id, 'to')} key={e.id}>{e.name}</li>
              }))
              :''}
              </ul>
              }
              
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
              <label htmlFor='needs1'><input className='needs' id='needs1' type='checkbox' name='needs1' value={trip.needs1} onChange={(e)=>handleChange(e)}/>Help with luggage</label>
              <label htmlFor="needs2"><input className='needs' id='needs2' type='checkbox' name='needs2' value={trip.needs2} onChange={(e)=>handleChange(e)} />Ride home</label>
              <label htmlFor="needs3"><input className='needs' id='needs3' type='checkbox' name='needs3' value={trip.needs3} onChange={(e)=>handleChange(e)} />Language help</label>
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