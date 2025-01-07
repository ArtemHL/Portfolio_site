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
                if (data.status === 'success') {
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
                    <div className="confirmation-popup-back" onClick={handleClose}>
                    </div>
                    <div className="confirmation-popup">
                        <div className="confirmation-popup-header">
                            <h2>Confirmation</h2>
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
                </div>
    )
}

export default ConfirmationPopUp