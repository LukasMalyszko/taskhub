import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = 'todo' | 'completed' | 'canceled';

export type Task = { 
  id: string; 
  title: string; 
  description?: string;
  status: TaskStatus;
  createdAt: string;
};

const initialState: Task[] = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string; description?: string }>) => {
      state.push({ 
        id: crypto.randomUUID(), 
        title: action.payload.title, 
        description: action.payload.description,
        status: 'todo',
        createdAt: new Date().toISOString()
      });
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.find(t => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      return state.filter(task => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: string; title: string; description?: string }>) => {
      const task = state.find(t => t.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
        task.description = action.payload.description;
      }
    },
    clearAllTasks: (state) => {
      return [];
    },
    hydrateFromStorage: (state, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask, updateTask, clearAllTasks, hydrateFromStorage } = tasksSlice.actions;
export default tasksSlice.reducer;
