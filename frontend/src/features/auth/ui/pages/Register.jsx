import React from 'react'

const Register = () => {
  return (
    <div>
      <form action="">

        <label htmlFor="name">Name</label>
        <input type="text" id='name' />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" id='phoneNumber' />

        <label htmlFor="age">Age</label>
        <input type="number" id='age' />

        <label htmlFor="password">Password</label>
        <input type="password" id='password' />



      </form>
    </div>
  )
}

export default Register