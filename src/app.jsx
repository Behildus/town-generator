import * as React from 'react';
import EditSpecies from './components/edit-species.jsx';
import EditPeople from './components/edit-people.jsx';
import EditItems from './components/edit-items.jsx';
import GenerateTown from './components/generate-town.jsx';
import PropTypes from 'prop-types';
import {Tab, Tabs, Typography, Box, Switch, Drawer} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

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

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
    const [value, setValue] = React.useState(0);
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
      
    const theme = React.useMemo(
        () =>
          createTheme({
            palette: {
              mode,
            },
          }),
        [mode],
    );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <Box className='app' sx={{
                    width: '100%',
                    bgcolor: 'background.default',
                    color: 'text.primary'
                    }}
                >
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
                    <Switch onChange={colorMode.toggleColorMode}/>
                </Box>
            </ThemeProvider>
        </ColorModeContext.Provider>
        
        
    );
}

export default App;