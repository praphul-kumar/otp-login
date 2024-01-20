import React, { useState } from 'react'

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);

  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;

    if (phoneNumber.length > 10 || phoneNumber.length < 10 || regex.test(phoneNumber)) {
      setError('Enter a valid Phone Number.');
      return;
    }

    console.log('Form Submited.');
    setShowOTPField(true);
  };

  return (
    <div className='login-form'>
      {!showOTPField ?
      <form className='form-group' onSubmit={handlePhoneSubmit}>
        {error && <div className='text-red mb-2'>{error}</div>}

        <div className="mb-2">
          <input 
            type="text" 
            name="phone" 
            id="phone" 
            className="form-control" 
            placeholder='Enter Phone No' 
            onChange={(e) => { setPhoneNumber(e.target.value) }} />
          
        </div>

        <button type="submit" className="submit-btn">Send OTP</button>
      </form> : 
      
      <div>
        <h4>OTP Sent to Phone: ({phoneNumber})</h4>
        
      </div>
      }
    </div>
  )
}
