import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spinner, Alert, Card } from "react-bootstrap";

const OldEmployees = () => {
  const [oldEmployees, setOldEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOldEmployees();
  }, []);

  const fetchOldEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/employee/getAllOldEmployees"
      );

      setOldEmployees(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch old employees.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-3">
        {error}
      </Alert>
    );
  }

  return (
    <Card className="shadow mt-3">
      <Card.Body>
        <h2 className="text-center mb-4">Old Employees</h2>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>

          <tbody>
            {oldEmployees.length > 0 ? (
              oldEmployees.map((emp) => (
                <tr key={emp.eid}>
                  <td>{emp.eid}</td>
                  <td>{emp.ename}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.salary}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No old employees found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default OldEmployees;