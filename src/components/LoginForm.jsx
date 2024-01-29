import React, { useState } from 'react'
import OTPField from './OTPField';

const SHOW_PHONE_INPUT = 0;
const SHOW_OTP_INPUT = 1;
const SHOW_SUCCESS_RESPONSE = 2;

export default function LoginForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(SHOW_PHONE_INPUT);

  // Hangle Phone Number Submit
  const handlePhoneSubmit = (event) => {
    event.preventDefault();

    const regex = /[^0-9]/g;

    if (phoneNumber.length > 10 || phoneNumber.length < 10 || regex.test(phoneNumber)) {
      setError('Enter a valid Phone Number.');
      return;
    }

    console.log('Form Submited.');
    setShowForm(SHOW_OTP_INPUT);
  };

  // Handle OTP Submit
  const onOTPSubmit = (otp) => {
    console.log('Login Success: ', otp)
    setShowForm(SHOW_SUCCESS_RESPONSE);
  };

  const renderForm = () => {
    if (showForm === SHOW_PHONE_INPUT) {
      return (
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
        </form>
      );
    } else if (showForm === SHOW_OTP_INPUT) {
      return (
        <div>
          <h4 className='text-center'>OTP Sent to Phone: ({phoneNumber})</h4>
          <OTPField length={4} onOTPSubmit={onOTPSubmit} />
        </div>
      );
    } else if (showForm === SHOW_SUCCESS_RESPONSE) {
      return (
        <h4 className='text-center text-succes'>Login Success</h4>
      );
    }
  }

  return (
    <div className='login-form'>
      {renderForm()}
    </div>
  );
}
