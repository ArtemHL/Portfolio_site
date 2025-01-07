import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ConfirmationPopUp = ({email}) => {

    const email1 = email;

    const [isVisible, setIsVisible] = useState(true);

    const navigate = useNavigate();

    const handleCheckVerification = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const verificationCode = formData.get('verificationCode');
        fetch('http://localhost:6655/verify-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email1,
                code: verificationCode
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.message === 'Email verified and registration completed successfully') {
                    alert('Email verified successfully');
                    navigate('/login');
                } else {
                    alert('Invalid verification code');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                return error;
            });
    }

    const handleClose = () => {
        setIsVisible(false);
    }

    return (
                <div>
                    {isVisible && (<div>
                    <div className="confirmation-popup-back" onClick={handleClose}>
                    </div>
                    <div className="confirmation-popup">
                        <button className="close-btn" onClick={handleClose}>X
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16"></svg>
                        </button>
                        <div className="confirmation-popup-header">
                            <h2>Verification code was sent to your email</h2>
                        </div>
                        <div className="confirmation-popup-body">
                            <form onSubmit={handleCheckVerification}>
                                <input
                                    type="text"
                                    name="verificationCode"
                                    placeholder="Enter verification code"
                                />
                                <button type="submit">Verify</button>
                            </form>
                        </div>
                    </div>
                </div>)}
                </div>
    )
}

export default ConfirmationPopUp