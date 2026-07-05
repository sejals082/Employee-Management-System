import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import companyPhoto from "../assets/companyphoto.jpg";

export default function EmployeeLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus(null);

    try {

        console.log("Email:", email);
console.log("Password:", password);

       
      const response = await fetch("http://localhost:8080/employee/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const employee = await response.json();

localStorage.setItem("employee", JSON.stringify(employee));

// Check today's attendance
navigate("/attendance");
      } else {
        const message = await response.text();

        setStatus({
          type: "danger",
          message,
        });
      }
    } catch (error) {
      setStatus({
        type: "danger",
        message: "Login failed.",
      });
    }

    setLoading(false);
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${companyPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
            }}
          >
            <h3 className="text-center mb-4">Employee Login</h3>

            {status && (
              <Alert variant={status.type}>
                {status.message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                className="w-100"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <Link
    to="/login"
    className="d-block mt-3 text-center"
>
    Login as an Admin
</Link>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}