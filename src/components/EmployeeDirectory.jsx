import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";

export default function EmployeeDirectory() {

    const [employees, setEmployees] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/employee/getAllEmployees")
            .then(res => res.json())
            .then(data => setEmployees(data))
            .catch(err => console.log(err));

    }, []);

    return (

        <Container className="mt-4">

            <h2 className="mb-4">Employee Directory</h2>

            <Table striped bordered hover>

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        employees.map(emp => (

                            <tr key={emp.eid}>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.phone}</td>
                            </tr>

                        ))
                    }

                </tbody>

            </Table>

        </Container>

    );
}