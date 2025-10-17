import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Task = { id: string; title: string; done: boolean };
const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.push({ id: crypto.randomUUID(), title: action.payload, done: false });
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const t = state.find(t => t.id === action.payload);
      if (t) t.done = !t.done;
    },
  },
});

export const { addTask, toggleTask } = tasksSlice.actions;
export default tasksSlice.reducer;
