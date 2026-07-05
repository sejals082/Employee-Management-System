import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Attendance() {

    const navigate = useNavigate();

    const employee = JSON.parse(localStorage.getItem("employee"));

    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date().toLocaleTimeString());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const checkIn = async () => {

        const response = await fetch(
            `http://localhost:8080/attendance/checkin/${employee.eid}`,
            {
                method: "POST"
            }
        );

        if (response.ok) {

            alert("Attendance Marked Successfully");

            navigate("/employee-dashboard");

        }

    };

    return (

        <Container className="mt-5">

            <Card className="shadow p-4">

                <h2 className="text-center">
                    Employee Attendance
                </h2>

                <hr/>

                <h4>Welcome {employee.name}</h4>

                <p>

                    <b>Date :</b>

                    {" "}

                    {new Date().toLocaleDateString()}

                </p>

                <p>

                    <b>Time :</b>

                    {" "}

                    {currentTime}

                </p>

                <Button onClick={checkIn}>

                    Check In

                </Button>

            </Card>

        </Container>

    );

}