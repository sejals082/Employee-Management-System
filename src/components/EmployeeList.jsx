import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from "react-router-dom";

function EmployeeList() {
    const [employees, setEmployees] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    const fetchEmployees = () => {
        fetch('http://localhost:8080/employee/getAllEmployees')
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data)
                console.log('Fetched employees:', data)
            })
            .catch((error) => {
                console.error('Failed to fetch employees:', error)
            })
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const filteredEmployees = employees.filter((emp) => {
        const lowerTerm = searchTerm.toLowerCase()
        return (
            String(emp.eid).toLowerCase().includes(lowerTerm) ||
            (emp.name && emp.name.toLowerCase().includes(lowerTerm)) ||
            (emp.address && emp.address.toLowerCase().includes(lowerTerm)) ||
            (emp.email && emp.email.toLowerCase().includes(lowerTerm)) ||
            (emp.phone && emp.phone.toLowerCase().includes(lowerTerm)) ||
            (emp.department && emp.department.toLowerCase().includes(lowerTerm)) ||
            (emp.designation && emp.designation.toLowerCase().includes(lowerTerm)) ||
            (emp.gender && emp.gender.toLowerCase().includes(lowerTerm)) ||
            (emp.maritalStatus && emp.maritalStatus.toLowerCase().includes(lowerTerm)) ||
            (emp.bloodGroup && emp.bloodGroup.toLowerCase().includes(lowerTerm))
            (emp.password && emp.password.toLowerCase().includes(lowerTerm))
            )
    })

    const deleteEmployee = async (eid) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this employee?')
        if (!confirmDelete) return

        try {
            const response = await fetch(`http://localhost:8080/employee/deleteEmployeeById/${eid}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error(`Delete failed with status ${response.status}`)
            }

            setEmployees((current) => current.filter((emp) => emp.eid !== eid))
        } catch (error) {
            console.error('Failed to delete employee:', error)
            alert('Could not delete employee. Check the API endpoint or try again.')
        }
    }

    return (
        <div className="p-3">
            <h4 className="mb-3">Employee List</h4>
            <Form className="mb-3" onSubmit={(e) => e.preventDefault()}>
                <Form.Control
                    type="search"
                    placeholder="Search by ID, name, department, email, phone, etc."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
            </Form>

<div className="table-responsive"></div>

            <div className="table-responsive">
                <Table striped bordered hover size="sm">
                    <thead>
                       <tr>
                            <th>Photo</th>
                            <th>EID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Designation</th>
                            <th>Date Of Joining</th>
                            <th>Date Of Birth</th>
                            <th>Gender</th>
                            <th>Marital Status</th>
                            <th>Blood Group</th>
                            <th>Password</th>
                            <th>Actions</th>
        
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.eid}>

                            <td>
                                {emp.photo ? (
                                    <img
                                        src={`http://localhost:8080/uploads/employee/${emp.photo}`}
                                        alt="Employee"
                                        width="60"
                                        height="60"
                                        style={{
                                            borderRadius: "50%",
                                            objectFit: "cover"
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="https://via.placeholder.com/60"
                                        alt="No Photo"
                                        width="60"
                                        height="60"
                                        style={{
                                            borderRadius: "50%"
                                        }}
                                    />
                                )}
                            </td>
                        
                            <td>{emp.eid}</td>
                                <td>{emp.name}</td>
                                <td>{emp.address}</td>
                                <td>{emp.salary}</td>
                                <td>{emp.email}</td>
                                <td>{emp.phone}</td>
                                <td>{emp.department}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.dateOfJoining}</td>
                                <td>{emp.dateOfBirth}</td>
                                <td>{emp.gender}</td>
                                <td>{emp.maritalStatus}</td>
                                <td>{emp.bloodGroup}</td>
                                <td>{emp.password}</td>

                                <td className="d-flex gap-2">

                                <Button
        variant="warning"
        size="sm"
        onClick={() => navigate(`/admin-leave-requests/${emp.eid}`)}
    >
        Leave
    </Button>


                                    
    <Button
        variant="primary"
        size="sm"
        onClick={() => navigate(`/editEmployee/${emp.eid}`)}
    >
        Edit
    </Button>

    <Button
        variant="danger"
        size="sm"
        onClick={() => deleteEmployee(emp.eid)}
    >
        Delete
    </Button>

    <Button
        variant="success"
        size="sm"
        onClick={() => navigate(`/viewEmployee/${emp.eid}`)}
    >
        View
    </Button>
</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default EmployeeList;