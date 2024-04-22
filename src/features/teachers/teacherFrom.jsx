import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addTeacherAsync, updateTeacherAsync } from "./teacherSlice";

const TeacherForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = state !== null;

  const initialTeacherData = {
    name: "",
    subject: "",
    contact: 0,
  };

  const [teacherInput, setTeacherInput] = useState(
    isEditing
      ? {
          name: state.name,
          subject: state.subject,
          contact: state.contact,
        }
      : initialTeacherData,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updateTeacherAsync({ id: state._id, updatedTeacher: teacherInput }),
      );
      navigate(`/teachers/${state._id}`);
    } else {
      dispatch(addTeacherAsync(teacherInput));
      navigate("/teachers");
    }
  };

  return (
    <div className="page">
      <h2>{isEditing ? "Edit" : "Add"} Teacher</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Name:</label>
          <input
            placeholder="Enter Name"
            type="text"
            value={teacherInput.name}
            onChange={(e) =>
              setTeacherInput({ ...teacherInput, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            placeholder="Enter Subject"
            type="text"
            value={teacherInput.subject}
            onChange={(e) =>
              setTeacherInput({ ...teacherInput, subject: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            placeholder="Enter Contact"
            type="number"
            min={0}
            value={teacherInput.contact}
            onChange={(e) =>
              setTeacherInput({ ...teacherInput, contact: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"} Teacher</button>
      </form>
    </div>
  );
};

export default TeacherForm;
