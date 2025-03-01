import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import userReducer from './slice/userSlice.js'
import workspaceReducer from './slice/workspaceSlice.js'
import folderReducer from './slice/foderSlice.js'
import formReducer from './slice/formSlice.js'
import responseReducer from './slice/responseSlice.js'; 
import analyticReducer from './slice/analyticSlice.js'; 

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "workspace"],
};

const rootReducer = combineReducers({
    user: userReducer,
    workspace: workspaceReducer,
    folder: folderReducer, 
    form: formReducer,
    responses: responseReducer,
    analytics: analyticReducer

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

export default store;