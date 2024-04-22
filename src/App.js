import ClassView from "./components/classView";
import SchoolView from "./components/schoolView";
import StudentView from "./components/studentView";
import TeacherView from "./components/teacherView";
import "./styles.css";

import { Routes, Route, NavLink } from "react-router-dom";

import StudentForm from "./features/students/studentFrom";
import StudentDetail from "./features/students/studentDetails";

import TeacherDetail from "./features/teachers/teacherDetails";
import TeacherForm from "./features/teachers/teacherFrom";

export default function App() {
  const isActiveStyle = ({ isActive }) => ({
    fontWeight: isActive ? "500" : "",
    color: isActive ? "#fff7ec" : "",
  });
  return (
    <div className="App">
      <div>
        <h1>School Management System</h1>
        <nav>
          <ul className="navbar">
            <li>
              <NavLink to="/" style={isActiveStyle} className="nav-item">
                Students
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/teachers"
                style={isActiveStyle}
                className="nav-item"
              >
                Teachers
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes" style={isActiveStyle} className="nav-item">
                Classes
              </NavLink>
            </li>
            <li>
              <NavLink to="/school" style={isActiveStyle} className="nav-item">
                Schools
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<StudentView />} />
        <Route path="/teachers" element={<TeacherView />} />
        <Route path="/classes" element={<ClassView />} />
        <Route path="/school" element={<SchoolView />} />
        <Route path="/teachers/:id" element={<TeacherDetail />} />
        <Route path="/teachers/add" element={<TeacherForm />} />
        <Route path="/teachers/edit/:id" element={<TeacherForm />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/students/add" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />
      </Routes>
      <footer>
        <p>Designed and Developed by Rushikesh Waman Shirsat</p>
      </footer>
    </div>
  );
}
