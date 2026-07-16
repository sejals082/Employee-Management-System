import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap'

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

export default function EditEmployee() {
  const { eid } = useParams()
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState(initialFormValues)
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:8080/employee/getEmployeeById/${eid}`)
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`)
        }

        const employee = await response.json()
        setFormValues({
          eid: employee.eid ?? '',
          name: employee.name ?? '',
          address: employee.address ?? '',
          salary: employee.salary ?? '',
          email: employee.email ?? '',
          phone: employee.phone ?? '',
          department: employee.department ?? '',
          designation: employee.designation ?? '',
          dateOfJoining: employee.dateOfJoining ?? '',
          dateOfBirth: employee.dateOfBirth ?? '',
          gender: employee.gender ?? '',
          maritalStatus: employee.maritalStatus ?? '',
          bloodGroup: employee.bloodGroup ?? '',
          photo: employee.photo ?? '',
          password: employee.password ?? '',
          securityQuestion: employee.securityQuestion ?? '',
securityAnswer: employee.securityAnswer ?? ''
        })
        if (employee.photo) {
          setPreview(`http://localhost:8080/uploads/employee/${employee.photo}`)
      }

      } catch (error) {
        console.error('Failed to load employee:', error)
        setStatus({ type: 'danger', message: 'Could not load employee data.' })
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [eid])

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
            throw new Error("Upload failed")
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
      const response = await fetch(`http://localhost:8080/employee/updateEmployee/${eid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      })

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`)
      }

      setStatus({ type: 'success', message: 'Employee updated successfully.' })
      setTimeout(() => navigate('/employeeList'), 800)
    } catch (error) {
      console.error('Update employee failed:', error)
      setStatus({ type: 'danger', message: 'Failed to update employee. Check the API endpoint and try again.' })
    }
  }

  if (loading) {
    return (
      <div className="p-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  return (
    <div className="p-3">
      <h4 className="mb-3">Edit Employee</h4>

      {status && (
        <Alert variant={status.type} onClose={() => setStatus(null)} dismissible>
          {status.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="g-3">

        <Col md={12} className="text-center">

{preview && (

    <img
        src={preview}
        alt="Employee"
        width="130"
        height="130"
        style={{
            borderRadius: "50%",
            objectFit: "cover",
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
                readOnly
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
                type="text"
              />
            </Form.Group>
          </Col>

          

<Col md={6}>
    <Form.Group>

        <Form.Label>Security Question</Form.Label>

        <Form.Select
    name="securityQuestion"
    value={formValues.securityQuestion}
    onChange={handleChange}
    required
>
    <option value="What is your favorite color?">
        What is your favorite color?
    </option>
</Form.Select>

    </Form.Group>
</Col>

          

          <Col md={12} className="mt-3">
            <Button type="submit">Update Employee</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
