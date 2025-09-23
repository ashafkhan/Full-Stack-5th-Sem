// src/App.js
import React, { useEffect } from "react";
import { Student, Teacher } from "./classes/Person";

function App() {
  useEffect(() => {
    const student = new Student("Alice", 20, "Mathematics");
    const teacher = new Teacher("Mr. Smith", 45, "Physics");

    student.displayInfo(); // Logs: Name: Alice, Age: 20, Course: Mathematics
    teacher.displayInfo(); // Logs: Name: Mr. Smith, Age: 45, Subject: Physics
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Check the console to see Person/Student/Teacher output</h1>
    </div>
  );
}

export default App;
