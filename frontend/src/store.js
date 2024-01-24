import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './reducers/authReducer';
import postReducer from './reducers/postReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  // Add more reducers as needed
});

const persistConfig = { key: 'root', storage, version: 1 };

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
