import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as WikiEm } from '../../logotipo.svg'
import withAuth from '../../hoc/withAuth';

const Login = (props) =>  {
  const [user, setUser] = useState({
    email:'',
    password:''
  });
  const [errors, setErrors] = useState('')
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { email, password } = user;
    props.login({ email, password })
    .then()
    .catch( error => {
      if(error.response.status === 404){
        setErrors('Usuario no encontrado')
      }
    });
  }

  const handleChange = (event) => {  
    const {name, value} = event.target;
    setUser(
      {...user,[name]: value}
      );
  }

    return (
      <>
        <div className="login">
          <WikiEm className="logo"/>
          <div className="login-content">
            <button className="login-tab">LOG IN</button>
            <form className="login-form" onSubmit={(e)=>handleFormSubmit(e)}>
              <label className="label" htmlFor='email'>Email</label>
              <input className="input" id='email' type='email' name='email' value={user.email} onChange={(e)=>handleChange(e)}/>
              <label htmlFor='password'>Password</label>
              <input className="input" id='password' type='password' name='password' value={user.password} onChange={(e)=>handleChange(e)} />
                <button className="login-button-submit" type='submit'>LOG IN</button>   
            </form>
            {errors && <p className="error">{errors}</p>}
            <div>
              <p>You don't have an accout yet?
                  <Link className="small-title" to={'/signup'}>SIGN UP</Link>
              </p>
            </div>
          </div>
        </div>
      </>
    )
}

export default withAuth(Login);