import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";
import { sessionStorageMiddleware } from "@/utils/sessionStorageMiddleware";

const rootReducer = {
  tasks: tasksReducer,
};

export const store = configureStore({
  reducer: rootReducer,
  // Don't preload state here to avoid hydration issues
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization checks
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(sessionStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
