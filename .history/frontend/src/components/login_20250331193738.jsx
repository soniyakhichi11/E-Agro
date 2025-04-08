import React from 'react'

export const login = () => {
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
          <form onSubmit={handleSubmit}>
            <h2>Login H Here</h2>

            <label htmlFor="username"> Name</label>
            <input type="text" name="username" placeholder="Enter your name" value={formData.username} onChange={handleChange} required />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="phone">Phone</label>
            <input type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />

            <button type="submit">Submit</button>
          </form>

          {/* Already registered? Login link */}
          <p>
            Already registered?{" "}
            <span
              onClick={() => navigate('/login')}
              style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  </main>
  )
}
