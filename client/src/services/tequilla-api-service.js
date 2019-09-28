import axios from 'axios';

class TequillaApiService {
  constructor() {
    this.trip = axios.create({
      baseURL: ``,
      withCredentials: true,
    })
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