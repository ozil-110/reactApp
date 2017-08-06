import {createStore,applyMiddleware,compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import Root from '../src/reducers/index';
//import rootEpic from './reducers/index.epics.js';
//import { createEpicMiddleware } from 'redux-observable';

//const epicMiddleware = createEpicMiddleware(rootEpic);
import { composeWithDevTools } from 'redux-devtools-extension';
export default function(initState){
    return createStore(Root,initState,composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    ))
}
