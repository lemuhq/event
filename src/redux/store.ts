import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { api } from "./services/api";

//reducers
import authReducer from "./slices/authSlice";
import eventReducer from "./slices/eventSlice";

const persistConfig = {
	key: "eventwave",
	storage,
	whitelist: ["auth", "event"],
};

const rootReducers = combineReducers({
	auth: authReducer,
	event: eventReducer,
	[api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}).concat(api.middleware),
	// .concat(eventApi.middleware),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
