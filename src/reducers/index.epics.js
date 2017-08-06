import { combineEpics } from 'redux-observable';
import { fetchUserEpic } from '../epics/user.epics.js';

export default combineEpics(fetchUserEpic);