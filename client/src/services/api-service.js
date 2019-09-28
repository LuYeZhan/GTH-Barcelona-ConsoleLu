import axios from 'axios';

class ApiService {
  constructor() {
<<<<<<< HEAD
    this.auth = axios.create({
      baseURL: 'https://kiwicom-prod.apigee.net/v2',      
=======
    this.trip = axios.create({
      baseURL: 'http://localhost:4000/api',
>>>>>>> 8e3a87978b1c8a92a6d65d5e76c921da18484690
      withCredentials: true,
    })
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