import React, {useEffect, useState} from 'react'
import withAuth from '../../hoc/withAuth';
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BACKEND_DOMAIN)

// objeto data para testing
const data = 
[{ 
  from: 'Madrid',
  to: 'Paris',
  startDate:'03/06/19',
  endDate:'06/06/19',
  needs:['Languages', 'Luggages', 'other'],
  request:['45409234092374','9237402374209347'],
  img:'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/07/08/paris.jpg?w968h681',
},
{ 
  from: 'Madrid',
  to: 'Barcelona',
  startDate:'07/06/19',
  endDate:'09/06/19',
  needs:[],
  request:[],
  img:'https://ihg.scene7.com/is/image/ihg/kimpton-barcelona-1700x750-v2',
},
{ 
  from: 'Madrid',
  to: 'Paris',
  startDate:'03/06/19',
  endDate:'06/06/19',
  needs:['Languages', 'Luggages', 'other'],
  request:['45409234092374','9237402374209347'],
  img:'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/07/08/paris.jpg?w968h681',
},]

// var para img de profile
const userImg = 'https://i.guim.co.uk/img/media/ce6b278a1454597ea129a8d2c096c23c0ac19d71/0_116_4060_2436/master/4060.jpg?width=300&quality=85&auto=format&fit=max&s=9590fccf8ce88332056255ccc30347a0'

const Me = (props) => {
    const [trips,setTrips] = useState(data)
  // const [trips, setTrips] = useState([]);
  // useEffect(()=>{
  //   socket.emit('me');
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[]);
  useEffect(()=>{
    if(props.user.userType !== 'traveller'){
      props.history.push('/em');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    socket.on('meList', trips => {
      console.log(trips, 'he entrado')
    })
  })

  return (
    <section className="traveller-trips">
      <div className="traveller-bg-header"></div>
      <div className="user-img-container" style={{backgroundImage:`url(${userImg})` }}></div>
    <button className="trip-tab">TRIPS</button>
    <article className="trip-card-container" >
      {trips.length > 0 ?
        trips.map((el,i)=>{
          return (
          <div className="trip-card-bg" key={i}>
            <img src={el.img} alt='city image'/>
            <div className="trip-card">
              <button className="trip-request">{el.request.length}</button>
              <p className="trip-card-from">{el.from}</p>
              <p className="trip-card-to">{el.to}</p>
              <hr></hr>
              <p className="trip-card-date">{el.startDate} to {el.endDate}</p>
              <ul>
              { el.needs.length >0 ?
              el.needs.map((need,i)=>{
                return (
                  <li key={i}>{need}</li>)
                })
                :<li>No special needs</li>}
              </ul>
            </div>
          </div>)
        })
      : <h1>No trips created yet</h1>}
    </article>
        <button className="trip-addnew"></button>
    </section>
  )
}

export default withAuth(Me)


