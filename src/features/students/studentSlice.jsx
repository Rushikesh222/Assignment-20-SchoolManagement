import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  status: "idle",
  error: null,
  classSortBy: "All",
  filter: "All",
  sortBy: "Select",
};

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    try {
      const response = await fetch(
        "https://35ad8b5e-7faa-42ff-9e2d-808df338d339-00-25bi1676fhppc.pike.replit.dev/students",
      );
      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to fetch students");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const addStudentAsync = createAsyncThunk(
  "students/addStudentAsync",
  async (newStudent) => {
    try {
      const response = await fetch(
        "https://35ad8b5e-7faa-42ff-9e2d-808df338d339-00-25bi1676fhppc.pike.replit.dev/students",
        {
          method: "POST",
          body: JSON.stringify(newStudent),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to add student");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudentAsync",
  async ({ id, updatedStudent }) => {
    try {
      const response = await fetch(
        `https://35ad8b5e-7faa-42ff-9e2d-808df338d339-00-25bi1676fhppc.pike.replit.dev/students/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedStudent),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to update student");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudentAsync",
  async (id) => {
    try {
      const response = await fetch(
        `https://schoolmanagementbackend.vishalsinghrawat.repl.co/students/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to delete student");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setClassSortBy: (state, action) => {
      state.classSortBy = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "success";
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.students.push(action.payload);
      })
      .addCase(addStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        const updatedStudent = action.payload;
        const index = state.students.findIndex(
          (student) => student._id === updatedStudent._id,
        );
        if (index !== -1) {
          state.students[index] = updatedStudent;
        }
      })
      .addCase(updateStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteStudentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.students = state.students.filter(
          (student) => student._id !== action.payload._id,
        );
      })
      .addCase(deleteStudentAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setClassSortBy, setFilter, setSortBy } = studentsSlice.actions;

export default studentsSlice.reducer;
