import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "Hello World",
};

// const counterSlice = createSlice({
//     name:"counter",
//     initialState: {count = 0},
//     reducers: {},
// });

const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
});
export default helloSlice.reducer;

