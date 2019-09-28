import React, {useEffect, useState} from 'react'
import withAuth from '../../hoc/withAuth.js';

const data = 
[{ 
  from: 'Madrid',
  to: 'Paris',
  startDate:'03/06/19',
  endDate:'06/06/19',
  needs:['Languages', 'Luggages', 'other'],
  request:['45409234092374','9237402374209347'],
  img:'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/08/07/08/paris.jpg?w968h681',
}]

const Me = (props) => {
  const [trips,setTrips] = useState(data)

  return (
    
    <section className="traveller-trips">
  
    <button className="trip-tab">TRIPS</button>
    <article className="trip-card-container" >
      {trips.length > 0 ?
        trips.map((el,i)=>{
          return (
          <div className="trip-card" key={i} style={{backgroundImage:`url(${el.img})`}}>
            <p className="trip-card-from">{el.from}</p>
            <p className="trip-card-to">{el.to}</p>
            <p className="trip-card-date">{el.startDate} to {el.endDate}</p>
            <ul>
            { el.needs.length >0 ?
            el.needs.map((need,i)=>{
              return (
                <li key={i}>{need}</li>)
            })
          :null}
            </ul>

          </div>)
        })
      : <h1>No trips created yet</h1>}
    </article>

    </section>
  )
}

export default withAuth(Me)


