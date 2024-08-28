import React, { useState } from 'react';
import axios from 'axios';
import "./ContactForm.css";// Import the CSS file
 
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
  
    try {
      const response = await axios.post('/api/contact', formData);
   
      setStatus('succeeded');
      setFormData({ firstName: '', lastName: '', email: '', mobile: '' }); // Reset form after successful submission
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  };
 
  return (
    <div className="container">
      <div className="content">
        <div className="leftSection">
          <h2 className="title">CONTACT</h2>
          <h2 className="subtitle">WITH AB-FURNITURE</h2>
          <p className="description">
            Sign up and discover the latest news on how we can help transform your outdoor projects with Akula marine-grade outdoor furniture.
          </p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputRow">
            <div className="inputGroup">
              <label htmlFor="firstName" className="label">FIRST NAME *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="lastName" className="label">LAST NAME *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input"
                required
              />
            </div>
          </div>
          <div className="inputGroup">
            <label htmlFor="email" className="label">EMAIL *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="emailInput"
              required
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="mobile" className="label">MOBILE NUMBER *</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="buttonContainer">
            <button
              type="submit"
              className={isHovered ? 'button buttonHover' : 'button'}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Submitting...' : 'SUBMIT'}
            </button>
          </div>
          {status === 'failed' && <p className="errorMessage">{error}</p>}
          {status === 'succeeded' && <p className="successMessage">Successfully submitted the form</p>}
        </form>
      </div>
    </div>
  );
};
 
export default ContactForm;