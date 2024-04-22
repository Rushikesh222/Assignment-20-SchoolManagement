import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudents,
  setClassSortBy,
  setFilter,
  setSortBy,
} from "../features/students/studentSlice";
import StudentList from "../features/students/StudentList";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, classSortBy, filter, sortBy, status, error } = useSelector(
    ({ students }) => students,
  );

  const allClasses = [
    "All",
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
  const allGenders = ["All", "Male", "Female", "Transgender"];
  const allSortOptions = ["Select", "Name", "Age", "Attendance", "Marks"];

  const classSortedStudents = students.filter((student) =>
    classSortBy === "All" ? true : student.class === classSortBy,
  );

  const filteredStudents = classSortedStudents.filter((student) =>
    filter === "All" ? true : student.gender === filter,
  );

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case allSortOptions[1]:
        return a.name.localeCompare(b.name);
      case allSortOptions[2]:
        return b.age - a.age;
      case allSortOptions[3]:
        return b.attendance - a.attendance;
      case allSortOptions[4]:
        return b.marks - a.marks;
      default:
        return 0;
    }
  });

  const handleClassChange = (e) => dispatch(setClassSortBy(e.target.value));
  const handleFilterChange = (e) => dispatch(setFilter(e.target.value));
  const handleSortChange = (e) => dispatch(setSortBy(e.target.value));

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  return (
    <div className="page">
      <h2>Class View</h2>

      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && <p className="message">{error}</p>}
      {status === "success" && (
        <div className="row-filters">
          <div>
            <label htmlFor="class">Class:</label>
            <select id="class" onChange={handleClassChange}>
              {allClasses.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="filter">Filter by Gender:</label>
            <select id="filter" onChange={handleFilterChange}>
              {allGenders.map((gender) => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" onChange={handleSortChange}>
              {allSortOptions.map((sort) => (
                <option key={sort} value={sort}>
                  {sort}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {status === "success" && (
        <StudentList students={sortedStudents} classViewPage />
      )}
    </div>
  );
};

export default ClassView;
