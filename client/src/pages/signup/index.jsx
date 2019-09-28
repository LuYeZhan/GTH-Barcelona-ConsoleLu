import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import withAuth from '../../hoc/withAuth.js';
import { ReactComponent as WikiEm } from '../../logotipo.svg'


const Signup = (props) => {
  const [user,setUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    form: false,
    userType: null
  })
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.signup(user)
      .then()
      .catch( error => console.log(error) )
  }

  const handleChange = (event) => {  
    const {name, value} = event.target;
    setUser({...user,[name]: value});
  }

  const handleSelectUserType = (userType) => {
    setUser({
      ...user,
      form: true,
      userType,
    })
  }
  
  
  return (
    <div className="login">
    {console.log(user.userType)}
      <WikiEm className="logo"/>
        <div className="login-content">
          {!user.form && user.userType === null ? 
            <section className="user-types">
              <button className="login-tab">SIGN UP</button>
              <section className="signup-card">
                <div className="usertype-traveller-img"></div>
                <p>I'm a <span className="span-title">Traveler</span></p>
                <button className="arrow" onClick={() => handleSelectUserType('traveller')}>></button>
              </section>
              <section className="signup-card">
              <div className="usertype-volunteer-img"></div>
                <p>I'm a <span className="span-title">Volunteer</span></p>
                <button className="arrow" onClick={() => handleSelectUserType('volunteer')}>></button>
              </section>
            </section>
            : <>
              <button className="login-tab">SIGN UP</button>
              {user.userType ? <p>I want to be a <span className="span-title">{user.userType}!</span></p> : null}
              <form className="signup-form" onSubmit={(e)=>handleFormSubmit(e)}>
                <label className="label" htmlFor='name'>Name</label>
                <input className="input" id='name' type='text' name='name' value={user.name} onChange={(e)=>handleChange(e)}/>
                <label className="label" htmlFor=''>Surname</label>
                <input className="input" id='surname' type='text' name='surname' value={user.surname} onChange={(e)=>handleChange(e)}/>
                <label className="label" htmlFor=''>Email</label>
                <input className="input" id='email' type='email' name='email' value={user.email} onChange={(e)=>handleChange(e)}/>
                <label className="label" htmlFor='password'>Password</label>
                <input className="input" id='password' type='password' name='password' value={user.password} onChange={(e)=>handleChange(e)} />
                <button className="signup-button-submit" type='submit'>SIGN IN</button>
              </form>
              </>
          }
              <div>
                <p>Already have an account? 
                  <Link className="small-title" to={'/login'}>LOG IN</Link>
                </p>
              </div>
          </div>

    </div>    )
  
}

export default withAuth(Signup);