import axios from 'axios';

class TequillaApiService {
  constructor() {
    this.trip = axios.create({
      baseURL: `https://kiwicom-prod.apigee.net/`
    })
  }
  getIATA(city) {
    return this.trip.get(`locations/query?term=${city}&locale=es-ES&location_types=airport&limit=10&active_only=true`, {
      headers: { 
        'apikey': 'RgBWCtuuGn2ZqGgspP4fHwU7Gh33Ml5Y'
      }
    })
    .then(res => res)
  }
  getAllMyTrips() {
    return this.trip.get(`/me`)
    .then(response => response)
  }
  addOneTrip(newTrip) {
    return this.trip.post('/trip/add', newTrip)
    .then(response => response)
  }
  editOneTrip(id, tripUpdated) {
    return this.trip.put(`/trip/edit/${id}`, tripUpdated)
    .then(response => response)
  }
  deleteOneTrip(id) {
    return this.trip.delete(`/trip/delete/${id}`)
    .then(response => response)
  }
}

const tequillaApiService = new TequillaApiService();

export default tequillaApiService;