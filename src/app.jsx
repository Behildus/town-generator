import * as React from 'react';
import EditSpecies from './components/edit-species.jsx';
import EditPeople from './components/edit-people.jsx';
import EditItems from './components/edit-items.jsx';
import GenerateTown from './components/generate-town.jsx';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography component={'div'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function App() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Generate Town" {...a11yProps(0)} />
                    <Tab label="Species" {...a11yProps(1)} />
                    <Tab label="People" {...a11yProps(2)} />
                    <Tab label="Items" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <GenerateTown/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <EditSpecies/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <EditPeople/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <EditItems/>
            </TabPanel>
        </Box>
    );
}

export default App;