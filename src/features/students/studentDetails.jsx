import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteStudentAsync } from "./studentSlice";

const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const student = useSelector((state) => {
    const students = state.students.students;
    return students.find((student) => student._id === id);
  });

  if (!student) {
    return <p>Student not found!</p>;
  }

  const handleDeleteStudent = () => {
    dispatch(deleteStudentAsync(student._id));
    navigate("/");
  };

  return (
    <div className="page details-page">
      <h2>Student Detail</h2>
      <p>
        <strong>Name: </strong>
        {student.name}
      </p>
      <p>
        <strong>Age: </strong>
        {student.age}
      </p>
      <p>
        <strong>Grade: </strong>
        {student.grade}
      </p>
      <p>
        <strong>Gender: </strong>
        {student.gender}
      </p>
      <p>
        <strong>Attendance: </strong>
        {student.attendance}
      </p>
      <p>
        <strong>Marks: </strong>
        {student.marks}
      </p>

      <Link to={`/students/edit/${id}`} state={student}>
        <button className="primary-btn">Edit Details</button>
      </Link>

      <button className="secondary-btn" onClick={handleDeleteStudent}>
        Delete
      </button>
    </div>
  );
};

export default StudentDetail;
