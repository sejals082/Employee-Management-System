import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import EmployeeSidebar from "./EmployeeSidebar";
import companyPhoto from "../assets/companyphoto.jpg";
import AttendanceChart from "./AttendanceChart";
import { useTheme } from "../context/ThemeContext";



export default function EmployeeDashboard() {

    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useTheme();

    
    const [showSidebar, setShowSidebar] = useState(false);

const handleClose = () => setShowSidebar(false);

const handleShow = () => setShowSidebar(true);

    const employee = JSON.parse(localStorage.getItem("employee"));
    const [todayAttendance, setTodayAttendance] = useState(null);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {

        fetch(`http://localhost:8080/attendance/today/${employee.eid}`)
            .then(res => res.json())
            .then(data => setTodayAttendance(data));
    
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
    
        return () => clearInterval(timer);
    
    }, []);

    const checkOut = async () => {

        const response = await fetch(
            `http://localhost:8080/attendance/checkout/${employee.eid}`,
            {
                method: "POST"
            }
        );
    
        if (response.ok) {

            alert("Checked Out Successfully");
        
            const attendanceResponse = await fetch(
                `http://localhost:8080/attendance/today/${employee.eid}`
            );
        
            const updatedAttendance = await attendanceResponse.json();
        
            setTodayAttendance(updatedAttendance);
        
        } else {
        
            alert("Unable to Check Out");
        
        }
    };

    const logout = () => {
        localStorage.removeItem("employee");
        navigate("/employee-login");
    };

    if (!employee) {
        return <h3 className="text-center mt-5">Employee Not Logged In</h3>;
    }

    return (

        <Container
        fluid
        style={{
            minHeight: "100vh",
            backgroundImage: `url(${companyPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            paddingTop: "40px"
        }}
    >

<EmployeeSidebar
    show={showSidebar}
    handleClose={handleClose}
/>

            <Card className="shadow">

                <Card.Body>

                <div className="d-flex justify-content-between align-items-center mb-3">

    <Button
        variant="dark"
        onClick={handleShow}
    >
        <FaBars /> Menu
    </Button>

    <Button
        variant={darkMode ? "light" : "dark"}
        onClick={toggleTheme}
    >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </Button>

</div>

                    <Row>

                        <Col md={3} className="text-center">

                            <img
                                src={`http://localhost:8080/uploads/employee/${employee.photo}`}
                                alt="Employee"
                                width="180"
                            />

                        </Col>

                        <Col md={9}>

                            <h2>Welcome {employee.name}</h2>

                            <h5 className="text-primary">
    📅 {currentTime.toLocaleDateString()}
</h5>

<h4 className="text-success">
    🕒 {currentTime.toLocaleTimeString()}
</h4>

                            <hr />

                            <h4>Quick Actions</h4>

<AttendanceChart employeeId={employee.eid} />

<div className="d-flex gap-3 mt-3 flex-wrap">

    <Button
        variant="primary"
        onClick={() => navigate("/employee-directory")}
    >
        Employee Directory
    </Button>

    <Button
        variant="success"
        onClick={() => navigate("/attendance-history")}
    >
        Attendance History
    </Button>

    <Button
        variant="secondary"
        onClick={() => navigate("/employee-profile")}
    >
        My Profile
    </Button>

    {todayAttendance && !todayAttendance.checkOut && (
        <Button
            variant="warning"
            onClick={checkOut}
        >
            Check Out
        </Button>
    )}



</div>




                   

                            <hr />


                            

 
                        </Col>

                    </Row>

                </Card.Body>

            </Card>

        </Container>

    );
}