
// import React, { useState } from 'react';
// import API from "../api/axios";
// import {useNavigate} from 'react-router-dom';

// export const Register = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     // Perform form validation and backend submission
//     try {
//       const response = await API.post("/auth/register", {
//         username: formData.username,
//         email: formData.email,
//         phone: formData.phone,
//         password: formData.password,
//       });
//       if (response.status === 200) {
//         const { userId} = response.data;
//         alert(`Registration successful! Your user ID is : ${userId}`);
        
//       } else {
//         alert('Registration failed!');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error.response ? error.response.data : error);
//     }
//   };

//   return (
//     <main className="register-page">
//     <div className="container">
//       <div className="left-section">
//         {/* <img src="https://th.bing.com/th/id/R.783f792834cc1760653ee0ddb42a1ae4?rik=NtqOB4WAJD4pNw&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2fd%2fd6%2fAllis-Chalmers_D21_series_II_tractor.jpg&ehk=ek4dD8r5un0UYJ%2f4o9m9OI5RJdGA%2b8OKYnrSK%2btdIXA%3d&risl=&pid=ImgRaw&r=0" alt="Profile" className="profile-image" /> */}
//       </div>
  
//       <div className="right-section">
//         <div className="form-container">
//           <form onSubmit={handleSubmit}>
//             <h2>Register Here</h2>
  
//             <label htmlFor="username"> Name</label>
//             <input type="text" name="username" placeholder="Enter your name" value={formData.username} onChange={handleChange} required />
  
//             <label htmlFor="email">Email</label>
//             <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
  
//             <label htmlFor="phone">Phone</label>
//             <input type="tel" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
  
//             <label htmlFor="password">Password</label>
//             <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
  
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   </main>
  
//   );
// };


import React, { useState } from 'react';
import API from "../api/axios";
import { useNavigate } from 'react-router-dom';



export const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/register", formData);

      if (response.status === 200) {
        const { userId, username, email } = response.data;

      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify({ userId, username, email }));

      alert(`Registration successful your id is ${userId}!`);

        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Email is already in use")
      } else {
        alert("Something Went Wrong");
      }
    }
  };

  return (
    <main className="register-page">
     
      <div className="container">
        <div className="left-section">
          {/* Optional image */}
        </div>

        <div className="right-section">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h2>Register Here</h2>

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
          </div>
        </div>
      </div>
    </main>
  );
};
