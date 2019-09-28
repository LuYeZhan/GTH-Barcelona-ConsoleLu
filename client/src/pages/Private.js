import React, { useState } from 'react'
import withAuth from '../hoc/withAuth.js';
import Menu from '../components/ui/menu/index'
const data = 
{ 
  from: 'Madrid',
  to: 'Paris',
  startDate:'03/06/19',
  endDate:'06/06/19',
  needs:['Languages', 'Luggages', 'other'],
  request:['45409234092374','9237402374209347']
}

const Private = (props) => {

    const [trips,setTrips] = useState(data)

    return (
      
      <section>
        <Menu/>

      <button class="traveler-tab">TRIPS</button>
      <h1>{trips.from}</h1>

      </section>


    )
  }

export default withAuth(Private);