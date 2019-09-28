import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:4000',
      withCredentials: true,
    })
  }

  signup(user) {
    return this.auth.post('/auth/signup', user)
      .then(({data} ) => data);
  }

  login(user) {

    return this.auth.post('/auth/login', user)
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout')
      .then(response => response.data)
  }

  me() {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }
}

const authService = new AuthService();

export default authService;