import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachers } from "../features/teachers/teacherSlice";
import TeacherList from "../features/teachers/teacherList";

const TeacherView = () => {
  const { teachers, status, error } = useSelector(({ teachers }) => teachers);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = () => {
      if (status === "idle") {
        dispatch(fetchTeachers());
      }
    };

    loadData();
  }, [status, dispatch]);

  return (
    <div className="page">
      {status === "loading" && <p className="message">Loading...</p>}
      {status === "error" && <p className="message">{error}</p>}
      {status === "success" && <TeacherList teachers={teachers} />}
    </div>
  );
};

export default TeacherView;
