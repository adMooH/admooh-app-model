import React from 'react';
import { default as App } from "./app";
export const getadMooHApp = (props) => <App {...props} />;
window.getadMooHApp = (props) => getadMooHApp(props);