import React from "react";
import { Link, useNavigate } from "react-router-dom";

const StudentList = ({ students, classViewPage }) => {
  const navigate = useNavigate();

  return (
    <div>
      {!classViewPage && <h2>Students View</h2>}
      {!classViewPage && (
        <button
          className="primary-btn"
          onClick={() => navigate("/students/add")}
        >
          Add Student
        </button>
      )}

      {students.length === 0 ? (
        <p className="message">No students available for display</p>
      ) : (
        <table className="item-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Grade</th>
              <th>Gender</th>
              <th>Attendance</th>
              <th>Marks</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student) => (
              <tr key={student._id} className="item-card">
                <td>
                  <Link to={`/students/${student._id}`}>
                    {student.name ?? "-"}
                  </Link>
                </td>
                <td>
                  <Link to={`/students/${student._id}`}>
                    {student.age ?? "-"}
                  </Link>
                </td>
                <td>
                  <Link to={`/students/${student._id}`}>
                    {student.grade ?? "-"}
                  </Link>
                </td>
                <td>
                  <Link to={`/students/${student._id}`}>
                    {student.gender ?? "-"}
                  </Link>
                </td>
                <td>
                  <Link to={`/students/${student._id}`}>
                    {student.attendance ?? "-"}
                  </Link>
                </td>
                <td>
                  <Link to={`/students/${student._id}`}>
                    {student.marks ?? "-"}
                  </Link>
                </td>
                <td>
                  <Link to={`/students/${student._id}`}>
                    {student.class ?? "-"}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;
