import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  teachers: [],
  status: "idle",
  error: null,
  filter: "All",
  sortBy: "name",
};

export const fetchTeachers = createAsyncThunk(
  "teachers/fetchTeachers",
  async () => {
    try {
      const response = await fetch(
        "https://35ad8b5e-7faa-42ff-9e2d-808df338d339-00-25bi1676fhppc.pike.replit.dev/teachers",
      );
      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to fetch teachers");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const addTeacherAsync = createAsyncThunk(
  "teachers/addTeacherAsync",
  async (newTeacher) => {
    try {
      const response = await fetch(
        "https://35ad8b5e-7faa-42ff-9e2d-808df338d339-00-25bi1676fhppc.pike.replit.dev/teachers",
        {
          method: "POST",
          body: JSON.stringify(newTeacher),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 201) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to add teacher");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const updateTeacherAsync = createAsyncThunk(
  "teachers/updateTeacherAsync",
  async ({ id, updatedTeacher }) => {
    try {
      const response = await fetch(
        `https://35ad8b5e-7faa-42ff-9e2d-808df338d339-00-25bi1676fhppc.pike.replit.dev/teachers/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedTeacher),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to update teacher");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const deleteTeacherAsync = createAsyncThunk(
  "teachers/deleteTeacherAsync",
  async (id) => {
    try {
      const response = await fetch(
        `https://35ad8b5e-7faa-42ff-9e2d-808df338d339-00-25bi1676fhppc.pike.replit.dev/teachers/${id}`,
        {
          method: "DELETE",
        },
      );

      if (response.status === 200) {
        const jsonData = await response.json();
        return jsonData.data;
      } else {
        throw new Error("Unable to delete teacher");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(addTeacherAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTeacherAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers.push(action.payload);
      })
      .addCase(addTeacherAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(updateTeacherAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeacherAsync.fulfilled, (state, action) => {
        state.status = "success";
        const updatedTeacher = action.payload;
        const index = state.teachers.findIndex(
          (teacher) => teacher._id === updatedTeacher._id,
        );
        if (index !== -1) {
          state.teachers[index] = updatedTeacher;
        }
      })
      .addCase(updateTeacherAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })
      .addCase(deleteTeacherAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeacherAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers = state.teachers.filter(
          (teacher) => teacher._id !== action.payload._id,
        );
      })
      .addCase(deleteTeacherAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, setSortBy } = teachersSlice.actions;

export default teachersSlice.reducer;
