import React from "react";
import { Link, useNavigate } from "react-router-dom";

const TeacherList = ({ teachers }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Teachers View</h2>
      <button className="primary-btn" onClick={() => navigate("/teachers/add")}>
        Add Teacher
      </button>

      {teachers.length === 0 ? (
        <p>No teachers available for display.</p>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {teachers?.map((teacher) => (
              <tr key={teacher._id} className="item-card">
                <td>
                  <Link to={`/teachers/${teacher._id}`}>{teacher.name}</Link>
                </td>
                <td>
                  <Link to={`/teachers/${teacher._id}`}>{teacher.subject}</Link>
                </td>
                <td>
                  <Link to={`/teachers/${teacher._id}`}>{teacher.contact}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherList;
