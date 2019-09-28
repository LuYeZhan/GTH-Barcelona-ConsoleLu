import React, {useState}from 'react'
import { ReactComponent as Ok } from '../../../svg/check.svg'
import apiService from '../../../services/api-service'
import moment from 'moment'
moment.locale('es')

const Card = (props) => {
  const [thisAccepted, setthisAccepted] = useState(props.trip.thisAccepted)
  const handleRequest = (idTrip) => {
    const toSend = {idTrip, user:props.user._id}
    apiService.pullRequest(toSend)
    .then(res => {
      if(res.status === 200){
        setthisAccepted(true)
      }
    })
  }
  return (
    <div className="trip-card-bg">
        <img src={props.trip.img} alt='city image'/>
        <div className="trip-card">
          <button className="trip-request">{props.trip.requests.length}</button>
          <p className="trip-card-from">{props.trip.from}</p>
          <p className="trip-card-to">{props.trip.to}</p>
          <hr></hr>
          <p className="trip-card-date">{moment(props.trip.startDate).format('L')} to {moment(props.trip.endDate).format('L')}</p>
          <ul>
          { props.trip.needs.length > 0 ?
          props.trip.needs.map((need,i)=>{
            return (
              <li key={i}>{need}</li>)
            })
            :<li>No special needs</li>
            }
          </ul>
          {thisAccepted ? 
            (<div className="chat-info"></div>)
            :
            (<button className="request" onClick={()=> handleRequest(props.trip._id)}><Ok/></button>)
          }
          
        </div>
      </div>
  )
}

export default Card
