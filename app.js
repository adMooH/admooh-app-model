import React from 'react';
import ReactDOM from 'react-dom';
import AppView from './src/preview/views/appView';
const { getadMooHTemplate } = require(process.env.ADMOOH_TEMPLATE);
ReactDOM.render(<AppView getApp={getadMooHTemplate}/>, document.getElementById("app"));
