import {renderToString} from 'react-dom/server';
import qs from 'qs';
import {Provider} from 'react-redux';
import reducerApp from '../src/reducers/index';
import React from 'react';
import {RouterContext,match} from 'react-router';
import {selectAuthor,fetchPostsIfNeeded} from '../src/actions/actions';
import createStore from '../src/configStore';
import routes from '../src/routes';
import fetch from 'isomorphic-fetch';
import fs from 'fs';
import path from 'path';


function renderFullPage(html,initState){
    const main = JSON.parse(fs.readFileSync(path.join(__dirname,'../webpack/webpack-assets.json'))).javascript.main;
    let injectScriptPath = main;
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">            
            <title>reactApp</title>
            <script></script>
        </head>
        <body>
            <div id="container"><div>${html}</div></div>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initState)}
            </script>
            <script src=${injectScriptPath}></script>
        </body>
        </html>
    `
}
//前后端路由和资源的统一
export default function handleRender(req,res){
    match({routes:routes,location:req.url},(err,redirectLocation,renderProps)=>{
        if(err){
            res.status(500).end(`server error: ${err}`)
        } else if(redirectLocation){
            res.redirect(redirectLocation.pathname+redirectLocation.search)
        } else if(renderProps){
            const store = createStore({});
            Promise.all([
                store.dispatch(selectAuthor('all')),
                store.dispatch(fetchPostsIfNeeded('all'))
            ])
            .then(()=>{
                const html = renderToString(
                    <Provider store={store}>
                        <RouterContext {...renderProps}/>
                    </Provider>
                )
                const finalState = store.getState();
                res.end(renderFullPage(html,finalState));
            })
        } else {
            res.status(404).end('404 not found')
        }
    })
}