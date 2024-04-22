import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addStudentAsync, updateStudentAsync } from "./studentSlice";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEditing = state !== null;

  const initialStudentData = {
    name: "",
    age: 0,
    grade: "A+",
    gender: "Male",
    attendance: 0,
    marks: 0,
    class: "Std I",
  };

  const [studentInput, setStudentInput] = useState(
    isEditing
      ? {
          name: state.name,
          age: state.age,
          grade: state.grade,
          gender: state.gender,
          attendance: state.attendance,
          marks: state.marks,
          class: state.class,
        }
      : initialStudentData,
  );

  const allGrades = [
    "A+",
    "A",
    "B+",
    "B",
    "C+",
    "C",
    "D+",
    "D",
    "E+",
    "E",
    "F",
  ];
  const allGenders = ["Male", "Female", "Transgender"];
  const allClasses = [
    "Std I",
    "Std II",
    "Std III",
    "Std IV",
    "Std V",
    "Std VI",
    "Std VII",
    "Std VIII",
    "Std IX",
    "Std X",
    "Std XI",
    "Std XII",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(
        updateStudentAsync({ id: state._id, updatedStudent: studentInput }),
      );
      navigate(`/students/${state._id}`);
    } else {
      dispatch(addStudentAsync(studentInput));
      navigate("/");
    }
  };

  return (
    <div className="page">
      <h2>{isEditing ? "Edit" : "Add"} Student</h2>
      <form onSubmit={handleSubmit} className="form">
        <div>
          <label>Name:</label>
          <input
            placeholder="Enter Name"
            type="text"
            value={studentInput.name}
            onChange={(e) =>
              setStudentInput({ ...studentInput, name: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            placeholder="Age"
            type="number"
            min={0}
            value={studentInput.age}
            onChange={(e) =>
              setStudentInput({ ...studentInput, age: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Grade:</label>
          <select
            onChange={(e) =>
              setStudentInput({ ...studentInput, grade: e.target.value })
            }
            value={studentInput.grade}
          >
            {allGrades.map((grade) => (
              <option value={grade} key={grade}>
                {grade}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Gender:</label>
          <div className="radio-btn-container">
            {allGenders.map((gender) => (
              <label key={gender} className="radio-btn">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={studentInput.gender === gender}
                  onChange={() => setStudentInput({ ...studentInput, gender })}
                />
                {gender}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>Attendance:</label>
          <input
            placeholder="Attendance"
            name="attendance"
            type="number"
            min={0}
            value={studentInput.attendance}
            onChange={(e) =>
              setStudentInput({
                ...studentInput,
                attendance: e.target.value,
              })
            }
            required
          />
        </div>
        <div>
          <label>Marks:</label>
          <input
            placeholder="Marks"
            name="marks"
            type="number"
            max={100}
            value={studentInput.marks}
            onChange={(e) =>
              setStudentInput({ ...studentInput, marks: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Class:</label>
          <select
            onChange={(e) =>
              setStudentInput({ ...studentInput, class: e.target.value })
            }
            value={studentInput.class}
          >
            {allClasses.map((className) => (
              <option value={className} key={className}>
                {className}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"} Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
