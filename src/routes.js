import React from 'react';
import {Route,IndexRoute} from 'react-router';
import App from '../src/components/App';
import Item from '../src/components/Item';
import List from '../src/components/List';
import Publish from '../src/components/Publish';
import Space from '../src/components/Space';
import LogIn from '../src/components/LogIn';
import Reg from '../src/components/Reg';

const routes = (
    <Route path="/" component={App}>
            <IndexRoute component={List}/>
            <Route path="/list/:author" component={List}/>
            <Route path="/item/:id" component={Item}/>
            <Route path="/space" component={Space}/>
            <Route path="/publish" component={Publish}/>
            <Route path="/logIn" component={LogIn}/>
            <Route path="/reg" component={Reg}/>
    </Route>
    );
export default routes;