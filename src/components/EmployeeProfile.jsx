import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";

export default function EmployeeProfile() {

    const employee = JSON.parse(localStorage.getItem("employee"));

    return (

        <Container className="mt-4">

            <Card className="shadow p-4">

                <Row>

                    <Col md={3} className="text-center">

                        <img
                            src={`http://localhost:8080/uploads/employee/${employee.photo}`}
                            width="180"
                            alt="Employee"
                        />

                    </Col>

                    <Col md={9}>

                        <h2>{employee.name}</h2>

                        <hr />

                        <p><b>Email :</b> {employee.email}</p>

                        <p><b>Phone :</b> {employee.phone}</p>

                        <p><b>Address :</b> {employee.address}</p>

                        <p><b>Department :</b> {employee.department}</p>

                        <p><b>Designation :</b> {employee.designation}</p>

                        <p><b>Salary :</b> ₹ {employee.salary}</p>

                        <p><b>Blood Group :</b> {employee.bloodGroup}</p>

                        <p><b>Gender :</b> {employee.gender}</p>

                        <p><b>Marital Status :</b> {employee.maritalStatus}</p>

                        <p><b>Date of Birth :</b> {employee.dateOfBirth}</p>

                        <p><b>Date of Joining :</b> {employee.dateOfJoining}</p>

                    </Col>

                </Row>

            </Card>

        </Container>

    );

}