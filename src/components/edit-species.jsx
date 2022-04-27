import * as React from 'react';
import { Box, Input, Button, ButtonGroup, TextField, InputLabel, FormHelperText, FormControl, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function submitSpecies(species_data) {
    window.electronAPI.putSpecies(species_data);
}

function EditSpecies() {
    const [species, setSpecies] = React.useState({});
    const [options, setOptions] = React.useState([]);
    const [new_species, setNewSpecies] = React.useState("");
    const [sel_species, setSelSpecies] = React.useState(null);
    const [in_value, setInValue] = React.useState("");
    const [add_disabled, setAddDisabled] = React.useState(true);
    const [rmv_disabled, setRmvDisabled] = React.useState(true);
    const [don_disabled, setDonDisabled] = React.useState(true);
    const [add_name_component, setAddNameComponent] = React.useState("");
    const [sel_name_component, setSelNameComponent] = React.useState("");
    
    React.useEffect(() => {
        (async () => {
            var species = await window.electronAPI.getSpecies();
            setSpecies(species);
            setOptions(Object.keys(species));
        })();
    }, [])
    

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off">
            <div>
                <Input 
                    id="species"
                    size="small"
                    placeholder="Add Species"
                    aria-describedby="species-helper-text"
                    value={new_species}
                    sx={{width: 300}}
                    onChange={(event) => {
                        setNewSpecies(event.target.value)
                        if (event.target.value === "") {
                            setAddDisabled(true)
                        } else {
                            setAddDisabled(false)
                        }
                        
                    }}/>
                <Button
                    startIcon={<AddIcon/>}
                    size="small"
                    variant="contained"
                    disabled={add_disabled}
                    onClick={() => {
                        var tmp_species = species;
                        tmp_species[new_species] = {};
                        setSpecies(tmp_species);
                        setOptions(Object.keys(tmp_species));
                        setNewSpecies("");
                        setAddDisabled(true);
                        setDonDisabled(false)
                        console.log(species)
                    }}
                >Add Species</Button>
                
            </div>
            <div style={{display: "flex", alignItems: "end", marginTop: 5}}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: 300}}
                    value={sel_species}
                    inputValue={in_value}
                    onChange={(event, newValue) => {
                        if (newValue == null) {
                            setRmvDisabled(true)
                            setAddNameComponent("");
                            setSelNameComponent("");
                        } else {
                            setRmvDisabled(false)
                            var tmp_add_name_component = 
                                <div style={{marginTop: 5}}>
                                <Input 
                                    id="name-type"
                                    size="small"
                                    placeholder="Add Name Type"
                                    aria-describedby="species-helper-text"
                                    value={""}
                                    sx={{width: 300}}/>
                                <Button
                                    startIcon={<AddIcon/>}
                                    size="small"
                                    variant="contained"
                                    disabled
                                    >Add Name Type</Button>
                            </div>;
                            setAddNameComponent(tmp_add_name_component)

                            var tmp_sel_name_component =
                                <div style={{display: "flex", alignItems: "end", marginTop: 5}}><Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={[]}
                                    sx={{ width: 300}}
                                    value={sel_species}
                                    inputValue={in_value}
                                    renderInput={(params) => <TextField {...params} 
                                        placeholder="Choose Name Type" 
                                        variant="standard" 
                                        />}
                                    />
                                    <Button 
                                    startIcon={<RemoveIcon/>}
                                    size="small"
                                    variant="contained"
                                    disabled
                                    >Remove Name Type</Button>
                                </div>
                            
                            setSelNameComponent(tmp_sel_name_component);
                        }
                        setSelSpecies(newValue)
                    }}
                    onInputChange={(event, newInputValue) => {
                        if (newInputValue !== null) {
                            setInValue(newInputValue)
                        }
                    }}  
                    renderInput={(params) => <TextField {...params} 
                        placeholder="Choose Species" 
                        variant="standard" 
                        />}
                />
                <Button 
                    startIcon={<RemoveIcon/>}
                    size="small"
                    variant="contained"
                    disabled={rmv_disabled}
                    onClick={() => {
                        var tmp_species = species;
                        delete tmp_species[sel_species]
                        setSpecies(tmp_species);
                        setOptions(Object.keys(tmp_species));
                        setSelSpecies(null);
                        setInValue("");
                        setRmvDisabled(true)
                        setDonDisabled(false)
                        setAddNameComponent("");
                        setSelNameComponent("");
                    }}
                >Remove Species</Button>
                
            </div>
            <div style={{marginLeft: 20}}>
                {add_name_component}
                {sel_name_component}
            </div>
            <div style={{margin: 5}}>
                <ButtonGroup disabled={don_disabled}>
                    <Button
                        startIcon={<SaveIcon/>}
                        size="small"
                        variant="contained"
                        onClick={() => {
                            submitSpecies(species);
                            setDonDisabled(true)
                        }}
                    >Save</Button>
                    <Button
                        startIcon={<DeleteIcon/>}
                        color="secondary"
                        size="small"
                        variant="contained"
                        onClick={(event) => {
                            (async () => {
                                var species = await window.electronAPI.getSpecies();
                                setOptions(Object.keys(species));
                            })();
                            setDonDisabled(true)
                        }}
                    >Discard</Button>
                </ButtonGroup>
            </div>
        </Box>
    );
}

export default EditSpecies;