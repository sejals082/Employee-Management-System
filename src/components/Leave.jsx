import React, { useState, useEffect} from "react";
import axios from "axios";
import { Card, Form, Button, Alert } from "react-bootstrap";


export default function Leave() {

    const employee = JSON.parse(localStorage.getItem("employee"));

    const [leaveDate, setLeaveDate] = useState("");
    const [reason, setReason] = useState("");
    const [message, setMessage] = useState("");
    const [leaveStatus, setLeaveStatus] = useState([]);

    useEffect(() => {

        fetchLeaveStatus();
    
    }, []);

    const applyLeave = async (e) => {

        e.preventDefault();

        try {

            await axios.post("http://localhost:8080/leave/apply", {

                employeeId: employee.eid,
                leaveDate: leaveDate,
                reason: reason

            });

            setMessage("Leave Applied Successfully.");

            setLeaveDate("");
            setReason("");

            fetchLeaveStatus();

        } catch (error) {

            setMessage("Failed to Apply Leave.");

        }

    };

    const fetchLeaveStatus = async () => {

        try {
    
            const response = await axios.get(
                `http://localhost:8080/leave/getEmployeeLeaves/${employee.eid}`
            );
    
            setLeaveStatus(response.data);
    
        } catch (error) {
    
            console.log(error);
    
        }
    
    };

    return (

        <div className="container mt-4">

            <Card>

                <Card.Header>

                    <h4>Apply Leave</h4>

                </Card.Header>

                <Card.Body>

                    {message &&

                        <Alert variant="info">

                            {message}

                        </Alert>

                    }

                    <Form onSubmit={applyLeave}>

                        <Form.Group className="mb-3">

                            <Form.Label>Leave Date</Form.Label>

                            <Form.Control
                                type="date"
                                value={leaveDate}
                                onChange={(e) => setLeaveDate(e.target.value)}
                                required
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">

                            <Form.Label>Reason</Form.Label>

                            <Form.Control
                                as="textarea"
                                rows={4}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                required
                            />

                        </Form.Group>

                        <Button
                            type="submit"
                            variant="primary"
                        >
                            Apply Leave
                        </Button>

                    </Form>

                    <hr />

<h5>My Leave Requests</h5>

<table className="table table-bordered">

    <thead>
        <tr>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
        </tr>
    </thead>

    <tbody>

        {leaveStatus.map((leave) => (

            <tr key={leave.id}>

                <td>{leave.leaveDate}</td>

                <td>{leave.reason}</td>

                <td>

                    {leave.status === "Pending" && (
                        <span className="text-warning fw-bold">
                            ⏳ Pending
                        </span>
                    )}

                    {leave.status === "Approved" && (
                        <span className="text-success fw-bold">
                            ✅ Your leave has been approved.
                        </span>
                    )}

                    {leave.status === "Disapproved" && (
                        <span className="text-danger fw-bold">
                            ❌ Your leave has been disapproved.
                        </span>
                    )}

                </td>

            </tr>

        ))}

    </tbody>

</table>

                </Card.Body>

            </Card>

        </div>

    );

}