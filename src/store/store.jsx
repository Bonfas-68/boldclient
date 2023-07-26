import userReducer from "./userSlice";
import tasksSlice from "./tasksSlice";
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import projectSlice from "./projectSlice";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const reducers = combineReducers({
    user:userReducer,
    tasks:tasksSlice,
    projects: projectSlice
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

// export const store = configureStore({
//     reducer:{
//         user: userSlice}
// })