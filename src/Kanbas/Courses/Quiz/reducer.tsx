import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [] as any[],
  quiz: { name: "New Module Name", description: "New Description", },
};


const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuizzes: (state, action) => {
      state.quizzes = [action.payload, ...state.quizzes];
    },

    deleteQuizzes: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (module) => module._id !== action.payload
      );
    },
    updateQuizzes: (state, action) => {
      state.quizzes = state.quizzes.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
  },
});


export const { addQuizzes, deleteQuizzes,
  updateQuizzes, setQuiz, setQuizzes } = quizzesSlice.actions;


export default quizzesSlice.reducer;

