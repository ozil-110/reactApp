import { Observable } from 'rxjs/Rx';
import { ajax } from 'rxjs/observable/dom/ajax';
import fetch from 'isomorphic-fetch';
import { REQUEST_USER, RECEIVE_USER } from '../actions/actions.js';
import {requestUser,recevieUser} from '../actions/actions.js';
import config from '../../config';

let url = `http://${config.serverip}:${config.serverport}/api/user`;
export const fetchUserEpic = action$ =>{
    const token = localStorage.getItem('token');
    const content = JSON.stringify({
                access_token: token
            })
    return action$.ofType(REQUEST_USER)
            .filter(()=>token !== null)
            .mergeMap(action =>
            ajax.getJSON(url,{
                    method: 'POST',
                    headers:{
                        "Content-Type": "application/json",
                        "Content-Length": content.length.toString()
                    },
                    body: content}
                )
                .map(response =>receiveUser(response))  
            );
}        