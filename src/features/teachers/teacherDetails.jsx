import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteTeacherAsync } from "./teacherSlice";

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const teacher = useSelector((state) => {
    const teachers = state.teachers.teachers;
    return teachers.find((teacher) => teacher._id === id);
  });

  if (!teacher) {
    return <p>Teacher not found!</p>;
  }

  const handleDeleteTeacher = () => {
    dispatch(deleteTeacherAsync(id));
    navigate("/teachers");
  };

  return (
    <div className="page details-page">
      <h2>Teacher Detail</h2>
      <p>
        <strong>Name: </strong>
        {teacher.name}
      </p>
      <p>
        <strong>Subject: </strong>
        {teacher.subject}
      </p>
      <p>
        <strong>Contact: </strong>
        {teacher.contact}
      </p>

      <Link to={`/teachers/edit/${id}`} state={teacher}>
        <button className="primary-btn">Edit Details</button>
      </Link>

      <button className="secondary-btn" onClick={handleDeleteTeacher}>
        Delete
      </button>
    </div>
  );
};

export default TeacherDetail;
