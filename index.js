import React from 'react';
import ReactDOM from 'react-dom';
import { DevAppView } from '@admooh-app/dev-tools';

require(process.env.ADMOOH_TEMPLATE);

const props = {
  getApp: window.admoohApp.get,
  prepareApp: window.admoohApp.prepare,
  defaultData: {
    feedType: 1
  }
};

ReactDOM.render(<DevAppView {...props} />, document.getElementById('app'));
