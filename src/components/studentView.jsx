import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../features/students/studentSlice";
import StudentList from "../features/students/studentList";

const StudentView = () => {
  const { students, status, error } = useSelector(({ students }) => students);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = () => {
      if (status === "idle") {
        dispatch(fetchStudents());
      }
    };
    loadData();
  }, [status, dispatch]);

  return (
    <div className="page">
      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && (
        <p className="message">
          {" "}
          Repl isn't wakeup yet
          <a
            href="https://replit.com/@RushikeshShirsa/SchoolManagementBackend"
            target="_blank"
          >
            {" "}
            Click here to navigate
          </a>
        </p>
      )}
      {status === "success" && <StudentList students={students} />}
    </div>
  );
};

export default StudentView;
