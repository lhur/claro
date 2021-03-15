import promise from 'redux-promise';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from "redux";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default function configureStore() {

    const store = applyMiddleware(multi, thunk, promise)(createStore)(persistedReducer, devTools);
    
    const persistor = persistStore(store);
        
    return { store, persistor };

}