import React from 'react';
import { default as App } from "./app";
export const getadMooHTemplate = (props) => <App {...props} />;
window.getadMooHTemplate = (props) => getadMooHTemplate(props);