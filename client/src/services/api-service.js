import axios from 'axios';

class ApiService {
  constructor() {
    this.trip = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_DOMAIN}api`,
      withCredentials: true
    })
  }
  pullRequest(data) {
    return this.trip.post('/pullrequest', data)
  }
  getAllTrips() {
    return this.trip.get('/em')
    .then(response => response)
  }
  checkchat(users){
    return this.trip.post('/checkchat', {users})
    .then(data => data)
  }
  pushmessage(data){
    return this.trip.post('/pushmessage', data)
    .then(data => data)
  }
  getmessages(id){
    return this.trip.post('/getmessages', id)
    .then(res => res)
  }
  getChat(data){
    return this.trip.post('/getchat', data)
    .then(data => data)
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

const apiService = new ApiService();

export default apiService;