import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export default function ActionTabs(props){
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    
    function handleChange(event, newValue) {
        setValue(newValue);
    }
    
    function handleChangeIndex(index) {
        setValue(index);
    }
    const tabs = props.tabs.map((t,i) => 
        <div key={i} value={value} index={i} >
               {t}
        </div>
    );
    return (
     <div>   
        <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
        >
            <Tab label="Data"/>
            <Tab label="Custom"/>
            <Tab label="Actions" />
        </Tabs>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            {tabs}
      </SwipeableViews>
    </div>
    );
}