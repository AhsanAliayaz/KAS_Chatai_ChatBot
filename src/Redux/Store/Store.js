import { createStore,applyMiddleware } from "redux";
import rootReducer from "../Reducer/Index";

import { persistStore, persistReducer } from 'redux-persist'
import storage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer,applyMiddleware(thunk))


export const persistor = persistStore(store)
export default store;
