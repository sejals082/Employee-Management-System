import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function AllLeaveRequests() {

    const [leaveRequests, setLeaveRequests] = useState([]);

    const fetchLeaves = () => {

        fetch("http://localhost:8080/leave/all")
            .then((response) => response.json())
            .then((data) => {
                setLeaveRequests(data);
            })
            .catch((error) => {
                console.error(error);
            });

    };

    useEffect(() => {

        fetchLeaves();

    }, []);

    const approveLeave = async (leaveId) => {

        await fetch(
            `http://localhost:8080/leave/approve/${leaveId}`,
            {
                method: "PUT"
            }
        );

        fetchLeaves();
    };

    const disapproveLeave = async (leaveId) => {

        await fetch(
            `http://localhost:8080/leave/disapprove/${leaveId}`,
            {
                method: "PUT"
            }
        );

        fetchLeaves();
    };

    return (

        <div className="p-3">

            <h3 className="mb-3">
                All Leave Requests
            </h3>

            <Table bordered hover>

                <thead>

                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Leave Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {leaveRequests.length === 0 ? (

                        <tr>
                            <td
                                colSpan="6"
                                className="text-center text-muted"
                            >
                                No leave requests found.
                            </td>
                        </tr>

                    ) : (

                        leaveRequests.map((leave) => (

                            <tr key={leave.id}>

                                <td>{leave.employeeId}</td>
                                <td>{leave.employeeName}</td>
                                <td>{leave.leaveDate}</td>
                                <td>{leave.reason}</td>
                                <td>{leave.status}</td>

                                <td>

                                    {leave.status === "Pending" ? (

                                        <>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="me-2"
                                                onClick={() =>
                                                    approveLeave(leave.id)
                                                }
                                            >
                                                Approve
                                            </Button>

                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() =>
                                                    disapproveLeave(leave.id)
                                                }
                                            >
                                                Disapprove
                                            </Button>
                                        </>

                                    ) : (

                                        leave.status

                                    )}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </Table>

        </div>

    );
}

export default AllLeaveRequests;