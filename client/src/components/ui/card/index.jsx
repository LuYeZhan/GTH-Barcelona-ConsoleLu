import React, {useState}from 'react'
import { ReactComponent as Ok } from '../../../svg/check.svg'
import apiService from '../../../services/api-service'
import moment from 'moment'
import io from 'socket.io-client'
import {withRouter} from 'react-router-dom'

const socketIo = io(process.env.REACT_APP_BACKEND_DOMAIN)

moment.locale('es')
const Card = (props) => {
  const [thisAccepted, setthisAccepted] = useState(props.trip.imon)
  const handleRequest = (idTrip) => {
    socketIo.emit('me')
    apiService.pullRequest({idTrip, user: props.user})
    .then(res => {
      if(res.status === 200){
        setthisAccepted(true)
      }
    })
  }
  const checkChat = (idUser) =>{
    console.log(idUser)
    apiService.checkchat([props.user,idUser ])
        .then(res => {
          props.history.push(`/chat/${res.data._id}`);
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
            (<button className="chat-info" onClick={()=>checkChat(props.trip.owner)}></button>)
            :
            (<button className="request" onClick={()=> handleRequest(props.trip._id)}><Ok/></button>)
          }
          
        </div>
      </div>
  )
}

export default withRouter(Card)