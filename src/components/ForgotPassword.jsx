import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpVerified, setOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const sendOtp = async () => {

        try {

            await axios.post(
                "http://localhost:8080/forgot-password/send-otp",
                null,
                {
                    params: { email }
                }
            );

            alert("OTP generated successfully! Please check your email.");

            setMessage("OTP sent to your registered email.");

        } catch (error) {

            setMessage("Email not found.");

        }

    };

    const verifyOtp = async () => {

        try {

            const response = await axios.post(
                "http://localhost:8080/forgot-password/verify-otp",
                null,
                {
                    params: {
                        email,
                        otp
                    }
                }
            );

            if (response.data === true) {

                setOtpVerified(true);
                setMessage("OTP verified successfully.");

            } else {

                setMessage("Invalid OTP.");

            }

        } catch (error) {

            setMessage("OTP verification failed.");

        }

    };

    const resetPassword = async () => {

        if (newPassword !== confirmPassword) {

            setMessage("Passwords do not match.");
            return;

        }

        try {

            await axios.post(
                "http://localhost:8080/forgot-password/reset",
                {
                    email,
                    password: newPassword
                }
            );

            alert("Password updated successfully.");

            navigate("/employee-login");

        } catch (error) {

            setMessage("Unable to reset password.");

        }

    };

    return (

        <div className="container mt-5">

            <Card className="p-4">

                <h3 className="text-center mb-4">
                    Forgot Password
                </h3>

                {message && (
                    <Alert variant="info">
                        {message}
                    </Alert>
                )}

                <Form.Group className="mb-3">

                    <Form.Label>Email</Form.Label>

                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </Form.Group>

                <Button
                    className="mb-3"
                    onClick={sendOtp}
                >
                    Send OTP
                </Button>

                <Form.Group className="mb-3">

                    <Form.Label>OTP</Form.Label>

                    <Form.Control
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                </Form.Group>

                {!otpVerified ? (

                    <Button
                        className="mb-3"
                        onClick={verifyOtp}
                    >
                        Verify OTP
                    </Button>

                ) : (

                    <>

                        <Form.Group className="mb-3">

                            <Form.Label>New Password</Form.Label>

                            <Form.Control
                                type="password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>Confirm Password</Form.Label>

                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />

                        </Form.Group>

                        <Button
                            onClick={resetPassword}
                        >
                            Reset Password
                        </Button>

                    </>

                )}

            </Card>

        </div>

    );

}