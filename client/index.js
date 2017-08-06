import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router,Route,browserHistory} from 'react-router';
import counterApp from '../src/reducers';
import createStore from '../src/configStore';
import routes from '../src/routes';
const initState = window.__INITIAL_STATE__;

const store = createStore(initState);

ReactDOM.render(
    <Provider store={store}>
       <Router history={browserHistory}>
        {routes}
       </Router>
    </Provider>,
    document.getElementById('container'));