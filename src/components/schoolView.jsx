import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSchoolStats,
  setTopStudent,
} from "../features/schools/schoolSlice";
import { fetchStudents } from "../features/students/studentSlice";

const SchoolView = () => {
  const dispatch = useDispatch();
  const school = useSelector((state) => state.school);
  const students = useSelector((state) => state.students);

  const { students: studentList, status } = students;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "success") {
      const totalStudents = studentList.length;
      const totalAttendance = studentList.reduce(
        (sum, { attendance }) => sum + parseFloat(attendance || 0),
        0,
      );
      const averageAttendance = (totalAttendance / totalStudents).toFixed(2); // Round to 2 decimal places
      const totalMarks = studentList.reduce(
        (sum, { marks }) => sum + parseFloat(marks || 0),
        0,
      );
      const averageMarks = (totalMarks / totalStudents).toFixed(2); // Round to 2 decimal places
      const topStudent = studentList.reduce(
        (top, student) => (student.marks > (top.marks || 0) ? student : top),
        "",
      );
      dispatch(
        updateSchoolStats({
          totalStudents,
          averageAttendance,
          averageMarks,
          topStudent,
        }),
      );

      dispatch(setTopStudent(topStudent));
    }
  }, [studentList, status, dispatch]);

  return (
    <div className="page details-page">
      <h2>School View</h2>
      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && <p className="message">Error loading data</p>}
      {status === "success" && (
        <>
          <p>
            <strong>Total Students: </strong>
            {school.totalStudents}
          </p>
          <p>
            <strong>Average Attendance: </strong>
            {school.averageAttendance}
          </p>
          <p>
            <strong>Average Marks: </strong>
            {school.averageMarks}
          </p>
          <p>
            <strong>Top Student: </strong>
            {school.topStudent ? school.topStudent.name : "-"}
          </p>
        </>
      )}
    </div>
  );
};

export default SchoolView;
