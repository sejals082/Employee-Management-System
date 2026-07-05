import React, { useEffect, useState } from "react";
import { Table, Container, Card } from "react-bootstrap";

export default function AttendanceHistory() {

    const employee = JSON.parse(localStorage.getItem("employee"));

    const [attendance, setAttendance] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:8080/attendance/history/${employee.eid}`)
            .then(res => res.json())
            .then(data => setAttendance(data));

    }, []);

    return (

        <Container className="mt-4">

            <Card className="shadow p-4">

                <h2 className="text-center">
                    My Attendance History
                </h2>

                <Table striped bordered hover className="mt-4">

                    <thead>

                        <tr>
                            <th>Date</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {attendance.map((item) => (

                            <tr key={item.id}>
                                <td>{item.attendanceDate}</td>
                                <td>{item.checkIn}</td>
                                <td>{item.checkOut || "-"}</td>
                                <td>{item.status}</td>
                            </tr>

                        ))}

                    </tbody>

                </Table>

            </Card>

        </Container>

    );

}