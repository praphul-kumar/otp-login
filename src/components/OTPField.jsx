import React, { useEffect, useRef, useState } from 'react'

export default function OTPField({ length = 4, onOTPSubmit = () => { } }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOTP = [...otp];

    // Allow Only one letter
    newOTP[index] = value.substring(value.length - 1);

    // Updating OTP State
    setOtp(newOTP);

    // Submit Trigger
    const combinedOtp = newOTP.join('');

    if (combinedOtp.length === length) {
      onOTPSubmit(combinedOtp);
    }

    // Move Focus to next Input 
    if (value && length - 1 > index && inputRefs.current[index + 1]) {
      console.log('Moving Focus to next input...');
      inputRefs.current[index + 1].focus();
    }
  }

  const handleCLick = (index) => {
    inputRefs.current[index].setSelectionRange(1,1);

    // If an previous input field is empty then it will move to that empty field
    const emptyIndex = otp.indexOf("");
    if (index > 0 && emptyIndex > -1 && emptyIndex < index) {
      inputRefs.current[emptyIndex].focus();
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      console.log('Moving focus to prev input.');
      inputRefs.current[index - 1].focus();
    }
  }

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="otp-wrapper">
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            ref={(input) => (inputRefs.current[index] = input)}
            type="text"
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={(e) => handleCLick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otp-input" />
        );
      })}
    </div>
  )
}
