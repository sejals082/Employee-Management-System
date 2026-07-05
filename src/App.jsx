import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import EmployeeList from './components/EmployeeList'
import CreateEmployee from './components/CreateEmployee'
import EditEmployee from './components/EditEmployee'
import OldEmployees from './components/OldEmployees'
import Login from './components/Login'
import EmployeeLogin from './components/EmployeeLogin'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider, useAuth } from './context/AuthContext'
import ViewEmployee from './components/ViewEmployee'
import Dashboard from "./components/Dashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import EmployeeDirectory from "./components/EmployeeDirectory";
import Attendance from "./components/Attendance";
import AttendanceHistory from "./components/AttendanceHistory";
import EmployeeProfile from "./components/EmployeeProfile";
import { ThemeProvider, useTheme } from "./context/ThemeContext";



function NavbarComponent() {
  const { isAuthenticated, user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          SpringWave Technologies
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
  {isAuthenticated && (
    <>
      <Nav.Link as={Link} to="/dashboard">
        Dashboard
      </Nav.Link>

      <Nav.Link as={Link} to="/employeeList">
        Employee List
      </Nav.Link>

      <Nav.Link as={Link} to="/createEmployee">
        Create Employee
      </Nav.Link>

      <Nav.Link as={Link} to="/oldEmployees">
        Old Employees
      </Nav.Link>
    </>
  )}
</Nav>

          <Nav>
            {isAuthenticated && (
              <>
                <span className="navbar-text text-light me-3">
                  Welcome, {user}!
                </span>

                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Container className="mt-3">
      <Routes>

        {/* Login */}
        <Route path="/login" element={<Login />} />

<Route path="/employee-login" element={<EmployeeLogin />} />

<Route
    path="/attendance"
    element={<Attendance />}
/>

<Route
    path="/employee-dashboard"
    element={<EmployeeDashboard />}
/>

<Route
    path="/employee-profile"
    element={<EmployeeProfile />}
/>

<Route
    path="/employee-directory"
    element={<EmployeeDirectory />}
 />

<Route
    path="/dashboard"
    element={
        <ProtectedRoute>
            <Dashboard />
        </ProtectedRoute>
    }
/>
<Route
    path="/attendance-history"
    element={<AttendanceHistory />}
/>

        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/employeeList" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Employee List */}
        <Route
          path="/employeeList"
          element={
            <ProtectedRoute>
              <EmployeeList />
            </ProtectedRoute>
          }
        />

        {/* Create Employee */}
        <Route
          path="/createEmployee"
          element={
            <ProtectedRoute>
              <CreateEmployee />
            </ProtectedRoute>
          }
        />

        {/* Edit Employee */}
        <Route
          path="/editEmployee/:eid"
          element={
            <ProtectedRoute>
              <EditEmployee />
            </ProtectedRoute>
          }
        />
        <Route
  path="/viewEmployee/:eid"
  element={
    <ProtectedRoute>
      <ViewEmployee />
    </ProtectedRoute>
  }
/>

        {/* Old Employees */}
        <Route
          path="/oldEmployees"
          element={
            <ProtectedRoute>
              <OldEmployees />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Container>
  )
}




function AppContent() {

  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <AuthProvider>
        <BrowserRouter>
          <NavbarComponent />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );

}

function App() {

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );

}





export default App;

