import React from "react";
import { Offcanvas, ListGroup } from "react-bootstrap";
import {
    FaHome,
    FaUser,
    FaUsers,
    FaClipboardList,
    FaCalendarAlt,
    FaSignOutAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";


export default function EmployeeSidebar({ show, handleClose }) {

    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useTheme();

    const logout = () => {
        localStorage.removeItem("employee");
        navigate("/employee-login");
    };

    return (
        <Offcanvas show={show} onHide={handleClose}>

            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    SpringWave HRMS
                </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>

                <ListGroup>

                    <ListGroup.Item
                        action
                        onClick={() => navigate("/employee-dashboard")}
                    >
                        <FaHome /> Dashboard
                    </ListGroup.Item>

                    <ListGroup.Item
    action
    onClick={() => navigate("/employee-profile")}
>
    <FaUser /> My Profile
</ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={() => navigate("/employee-directory")}
                    >

                        <FaUsers /> Employee Directory
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={() => navigate("/attendance-history")}
                    >
                        <FaClipboardList /> Attendance History
                    </ListGroup.Item>

                    <ListGroup.Item
    action
    onClick={() => navigate("/leave")}
>
    <FaCalendarAlt /> Leave
</ListGroup.Item>

                    <ListGroup.Item>

    <Form.Check
        type="switch"
        id="dark-mode-switch"
        label={darkMode ? "🌙 Dark Mode" : "☀ Light Mode"}
        checked={darkMode}
        onChange={toggleTheme}
    />

</ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={logout}
                    >
                        <FaSignOutAlt /> Logout
                    </ListGroup.Item>

                </ListGroup>

            </Offcanvas.Body>

        </Offcanvas>
    );
}