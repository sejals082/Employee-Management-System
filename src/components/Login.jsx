import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import companyPhoto from '../assets/companyphoto.jpg'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)
    setLoading(true)

    try {
      const response = await fetch(
        `http://localhost:8080/users/login/${username}/${password}`,
        {
          method: 'GET'
        }
      )

      const result = await response.text()

      console.log('Response:', result)
      console.log('Status:', response.status)

      if (result && result !== 'null' && result.toLowerCase() !== 'false') {
        login(result)
        setStatus({ type: 'success', message: 'Login successful!' })

        setTimeout(() => {
          navigate('/dashboard')
        }, 800)
      } else {
        setStatus({
          type: 'danger',
          message: 'Invalid username or password.'
        })
      }
    } catch (error) {
      console.error('Login failed:', error)
      setStatus({
        type: 'danger',
        message: 'Login failed. Check your credentials and try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      fluid
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${companyPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <div
            className="p-4 rounded shadow"
            style={{
              backgroundColor: 'rgba(255,255,255,0.9)'
            }}
          >
            <h3 className="mb-4 text-center">Admin Login</h3>

            {status && (
              <Alert
                variant={status.type}
                onClose={() => setStatus(null)}
                dismissible
              >
                {status.message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

            </Form>
             <Link to="/employee-login" className="d-block mt-3 text-center">
              Login as an Employee
             </Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}