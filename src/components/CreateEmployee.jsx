import React, { useState } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const initialFormValues = {
  eid: '',
  name: '',
  address: '',
  salary: '',
  email: '',
  phone: '',
  department: '',
  designation: '',
  dateOfJoining: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  bloodGroup: '',
  photo: '',
  password: '',
  securityQuestion: '',
securityAnswer: ''
}

export default function CreateEmployee() {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [status, setStatus] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({
      ...current,
      [name]: value
    }))
  }

  const handleImageUpload = async (event) => {

    const file = event.target.files[0]
  
    if (!file) return
  
    setPreview(URL.createObjectURL(file))
  
    const formData = new FormData()
    formData.append("file", file)
  
    try {
  
      const response = await fetch("http://localhost:8080/employee/upload", {
        method: "POST",
        body: formData
      })
  
      if (!response.ok) {
        throw new Error("Upload Failed")
      }
  
      const fileName = await response.text()
  
      setFormValues(current => ({
        ...current,
        photo: fileName
      }))
  
    } catch (error) {
  
      console.log(error)
      alert("Image upload failed")
  
    }
  
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus(null)

    try {
      console.log(formValues)
      const response = await fetch('http://localhost:8080/employee/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`)
      }

      setStatus({ type: 'success', message: 'Employee created successfully.' })
      setPreview(null)
      setFormValues(initialFormValues)
      setTimeout(() => {
        navigate('/employeeList')
      }, 800)
    } catch (error) {
      console.error('Create employee failed:', error)
      setStatus({ type: 'danger', message: 'Failed to create employee. Check the API endpoint and try again.' })
    }
  }

  return (
    <div className="p-3">
      <h4 className="mb-3">Create Employee</h4>

      {status && (
        <Alert variant={status.type} onClose={() => setStatus(null)} dismissible>
          {status.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="g-3">

          {/* Employee Photo */}
    <Col md={12} className="text-center">

    {preview ? (
  <img
    src={preview}
    alt="Preview"
    width="130"
    height="130"
    style={{
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "15px"
    }}
  />
) : (
  <img
    src="https://via.placeholder.com/130"
    alt="Default"
    width="130"
    height="130"
    style={{
      borderRadius: "50%",
      marginBottom: "15px"
    }}
  />
)}

<Form.Group>

  <Form.Label>
    Employee Photo
  </Form.Label>

  <Form.Control
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
  />

</Form.Group>

</Col>

          
          <Col md={4}>
            <Form.Group controlId="eid">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                name="eid"
                value={formValues.eid}
                onChange={handleChange}
                type="text"
                placeholder="Enter employee id"
                required
              />
            </Form.Group>
          </Col>

          <Col md={8}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={formValues.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter full name"
                required
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                value={formValues.address}
                onChange={handleChange}
                type="text"
                placeholder="Enter address"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                name="salary"
                value={formValues.salary}
                onChange={handleChange}
                type="number"
                placeholder="Enter salary"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={formValues.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                value={formValues.phone}
                onChange={handleChange}
                type="text"
                placeholder="Enter phone number"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                name="department"
                value={formValues.department}
                onChange={handleChange}
                type="text"
                placeholder="Enter department"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="designation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                name="designation"
                value={formValues.designation}
                onChange={handleChange}
                type="text"
                placeholder="Enter designation"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="bloodGroup">
              <Form.Label>Blood Group</Form.Label>
              <Form.Control
                name="bloodGroup"
                value={formValues.bloodGroup}
                onChange={handleChange}
                type="text"
                placeholder="Enter blood group"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="dateOfJoining">
              <Form.Label>Date Of Joining</Form.Label>
              <Form.Control
                name="dateOfJoining"
                value={formValues.dateOfJoining}
                onChange={handleChange}
                type="date"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="dateOfBirth">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control
                name="dateOfBirth"
                value={formValues.dateOfBirth}
                onChange={handleChange}
                type="date"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" value={formValues.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="maritalStatus">
              <Form.Label>Marital Status</Form.Label>
              <Form.Select name="maritalStatus" value={formValues.maritalStatus} onChange={handleChange}>
                <option value="">Select status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={formValues.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
          </Col>

          <Col md={12} className="mt-3">
            <Button type="submit">Save Employee</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
