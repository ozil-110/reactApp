import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import React from 'react';

const DevTools = createDevTools(
    <LogMonitor theme="tomorrow"/>
);

export default DevTools;