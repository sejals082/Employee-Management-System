import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { FaUsers, FaBuilding, FaArrowUp, FaArrowDown } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";




import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [pendingLeaves, setPendingLeaves] = useState(0);

    useEffect(() => {
        fetch("http://localhost:8080/employee/getAllEmployees")
            .then((response) => response.json())
            .then((data) => {
                setEmployees(data);
            })
            .catch((error) => {
                console.error("Error fetching employees:", error);
            });
    }, []);

    useEffect(() => {

        axios.get("http://localhost:8080/leave/all")
            .then((response) => {
    
                const pending = response.data.filter(
                    leave => leave.status === "Pending"
                );
    
                setPendingLeaves(pending.length);
            });
    
    }, []);

    const totalEmployees = employees.length;

    const totalDepartments = new Set(
        employees.map(emp => emp.department)
    ).size;

    const highestSalary =
        employees.length > 0
            ? Math.max(...employees.map(emp => Number(emp.salary)))
            : 0;

    const lowestSalary =
        employees.length > 0
            ? Math.min(...employees.map(emp => Number(emp.salary)))
            : 0;

            const departmentSalary = {};

employees.forEach((emp) => {
    const dept = emp.department;

    if (!departmentSalary[dept]) {
        departmentSalary[dept] = {
            totalSalary: 0,
            count: 0
        };
    }

    departmentSalary[dept].totalSalary += Number(emp.salary);
    departmentSalary[dept].count += 1;
});

const chartData = Object.keys(departmentSalary).map((dept) => ({
    department: dept,
    averageSalary: Math.round(
        departmentSalary[dept].totalSalary /
        departmentSalary[dept].count
    )
}));

const departmentCount = {};

employees.forEach((emp) => {
    departmentCount[emp.department] =
        (departmentCount[emp.department] || 0) + 1;
});

const pieData = Object.keys(departmentCount).map((dept) => ({
    name: dept,
    value: departmentCount[dept]
}));

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560"
];

const departmentCounts = {};

employees.forEach((emp) => {
    departmentCounts[emp.department] =
        (departmentCounts[emp.department] || 0) + 1;
});

    return (
        <Container className="mt-4">

            <h2 className="mb-4 text-center text-secondary">
                 Employee Dashboard
            </h2>

            <Row className="g-4">

    <Col md={3}>
        <Card
            className="shadow text-center text-white bg-primary"
            style={{ cursor: "pointer", borderRadius: "15px" }}
            onClick={() => navigate("/employeeList")}
        >
            <Card.Body>
                <FaUsers size={35} className="mb-2" />
                <h5>Total Employees</h5>
                <h2>{totalEmployees}</h2>
            </Card.Body>
        </Card>
    </Col>

    <Col md={3}>
    <Card
    className="shadow text-center text-white bg-success"
    style={{ cursor: "pointer", borderRadius: "15px" }}
    onClick={() => setShowDepartmentModal(true)}
>  <Card.Body>
                <FaBuilding size={35} className="mb-2" />
                <h5>Departments</h5>
                <h2>{totalDepartments}</h2>
            </Card.Body>
        </Card>
    </Col>

    <Col md={3}>
        <Card
            className="shadow text-center bg-warning"
            style={{ borderRadius: "15px" }}
        >
            <Card.Body>
                <FaArrowUp size={35} className="mb-2" />
                <h5>Highest Salary</h5>
                <h2>₹ {highestSalary.toLocaleString()}</h2>
            </Card.Body>
        </Card>
    </Col>

    <Col md={3}>
        <Card
            className="shadow text-center text-white bg-danger"
            style={{ borderRadius: "15px" }}
        >
            <Card.Body>
                <FaArrowDown size={35} className="mb-2" />
                <h5>Lowest Salary</h5>
                <h2>₹ {lowestSalary.toLocaleString()}</h2>
            </Card.Body>
        </Card>
    </Col>

</Row>

   

        {/* Average Salary Bar Chart */}
        <Row className="mt-5">
            <Col>
                <Card className="shadow">
                    <Card.Body>

                        <h4 className="text-center mb-4">
                            Average Salary by Department
                        </h4>

                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="department" />
                                <YAxis />
                                <Tooltip />
                                <Bar
                                    dataKey="averageSalary"
                                    fill="#0d6efd"
                                />
                            </BarChart>
                        </ResponsiveContainer>

                    </Card.Body>
                </Card>
            </Col>
        </Row>

        <Row className="mt-5 justify-content-center">
    <Col md={8} lg={6}>
        <Card className="shadow">
            <Card.Body>

                <h4 className="text-center mb-4">
                    Employees by Department
                </h4>

                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={120}
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>

            </Card.Body>
        </Card>
    </Col>
</Row>


<Modal
    show={showDepartmentModal}
    onHide={() => setShowDepartmentModal(false)}
    centered
>
    <Modal.Header closeButton>
        <Modal.Title>Department-wise Employee Count</Modal.Title>
    </Modal.Header>

    <Modal.Body>

        <table className="table table-bordered text-center">

            <thead className="table-dark">
                <tr>
                    <th>Department</th>
                    <th>Employees</th>
                </tr>
            </thead>

            <tbody>

                {Object.entries(departmentCounts).map(([dept, count]) => (
                    <tr key={dept}>
                        <td>{dept}</td>
                        <td>{count}</td>
                    </tr>
                ))}

                <tr className="table-primary">
                    <th>Total</th>
                    <th>{totalEmployees}</th>
                </tr>

            </tbody>

        </table>

    </Modal.Body>

    <Modal.Footer>
        <Button
            variant="secondary"
            onClick={() => setShowDepartmentModal(false)}
        >
            Close
        </Button>
    </Modal.Footer>
</Modal>

<Row className="mt-5">
    <Col>
        <Card className="shadow">
            <Card.Body>

                <h4>Pending Leave Requests</h4>

                <h2>{pendingLeaves}</h2>

                <Button
                    onClick={() => navigate("/all-leaves")}
                >
                    View Requests
                </Button>

            </Card.Body>
        </Card>
    </Col>
</Row>

</Container>



        
    );
}

export default Dashboard;