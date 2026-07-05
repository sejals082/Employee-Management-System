import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

export default function AttendanceChart({ employeeId }) {

    const [stats, setStats] = useState({
        present: 0,
        absent: 0
    });

    useEffect(() => {

        fetch(`http://localhost:8080/attendance/monthly-stats/${employeeId}`)
            .then(res => res.json())
            .then(data => setStats(data));

    }, [employeeId]);

    const attendanceData = [
        {
            name: "Attendance",
            Present: stats.present,
            Absent: stats.absent,
        }
    ];

    return (
        <Card className="shadow mt-4">
            <Card.Body>

                <h5 className="mb-3">
                    Monthly Attendance Statistics
                </h5>

                <ResponsiveContainer width="100%" height={220}>
    <BarChart
        data={attendanceData}
        layout="vertical"
        margin={{
            top: 15,
            right: 20,
            left: 90,
            bottom: 10
        }}
    >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis type="number" />

        <YAxis
            type="category"
            dataKey="name"
            width={110}
        />

        <Tooltip />

        <Legend />

        <Bar
    dataKey="Present"
    fill="#28a745"
    name="Present"
    barSize={18}
/>

<Bar
    dataKey="Absent"
    fill="#dc3545"
    name="Absent"
    barSize={18}
/>

    </BarChart>
</ResponsiveContainer>

            </Card.Body>
        </Card>
    );
}