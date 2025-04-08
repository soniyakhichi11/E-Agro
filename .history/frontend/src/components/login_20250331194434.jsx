import React from 'react'

export const Login = () => {
  return (
    <main className="register-page">
    <div className="container">
      
      {/* Left Section with Heading */}
      <div className="left-section">
         <div className="left-section">
          <h1 className="e-agro-title">E-Agro</h1>
          <h3 className="register-text">Welcome back. Please provide ypur detail</h3>
          {/* <p className='register-text2'>Welcome to E-agro please provide you details</p> */}
        </div>
        </div>

      {/* Right Section with Form */}
      <div className="right-section">
        <div className="form-container">
          <form >
            <h2>Login Here Here</h2>

           

            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} required />

        
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter your password" value={formData.password}  required />

            <button type="submit">Submit</button>
          </form>

          {/* Already registered? Login link */}
          <p>
            Haven't Registered?{" "}
            <span
              onClick={() => navigate('/login')}
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  </main>
  )
}
