import * as React from 'react';
import { Box, Input, Button, ButtonGroup, TextField, Snackbar, IconButton, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function submitSpecies(species_data) {
    window.electronAPI.putSpecies(species_data);
}

function EditSpecies() {
    // Layer 1: Add Species, Select Species, Remove Species,
    const [species, setSpecies] = React.useState({});
    const [species_options, setSpeciesOptions] = React.useState([]);
    const [new_species, setNewSpecies] = React.useState("");
    const [sel_species, setSelSpecies] = React.useState(null);
    const [in_value, setInValue] = React.useState("");
    const [add_species_disabled, setAddSpeciesDisabled] = React.useState(true);
    const [rmv_species_disabled, setRmvSpeciesDisabled] = React.useState(true);
    // Layer 2: Add Name Type, Select Name Type, Remove Name Type
    const [add_layer2, setLayer2] = React.useState("");
    const [names, setNames] = React.useState({});
    const [name_options, setNameOptions] = React.useState([]);
    const [sel_name_type, setSelNameType] = React.useState(null);
    // Save and Discard
    const [don_disabled, setDonDisabled] = React.useState(true);
    // Notification
    const [notif_state, setNotifState] = React.useState({
        open: false,
        message: ""
    })

    const handleNotifClose =() => {
        setNotifState({open: false, message: notif_state.message});
    }

    const handleNotifOpen = (new_message) => {
        setNotifState({open: true, message: new_message});
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleNotifClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );


    // Get species from database
    const refresh = () => {
        (async () => {
            var species = await window.electronAPI.getSpecies();
            setSpecies(species);
            setSpeciesOptions(Object.keys(species));
            
        })();
    }

    const addLayer2 = () => {
        var layer2 = 
            <div style={{marginLeft: 20}}>
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
                </div>
                <div style={{display: "flex", alignItems: "end", marginTop: 5}}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo1"
                        options={name_options}
                        sx={{ width: 300}}
                        value={sel_name_type}
                        onChange={(event, newValue) => {
                            setSelNameType(newValue);
                        }}
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
            </div>;
            
        setLayer2(layer2);
    }

    React.useEffect(() => {
        refresh();
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
                            setAddSpeciesDisabled(true)
                        } else {
                            setAddSpeciesDisabled(false)
                        }
                    }}
                />
                <Button
                    startIcon={<AddIcon/>}
                    size="small"
                    variant="contained"
                    disabled={add_species_disabled}
                    onClick={() => {
                        var tmp_species = species;
                        tmp_species[new_species] = {};
                        setSpecies(tmp_species);
                        setSpeciesOptions(Object.keys(tmp_species));
                        setNewSpecies("");
                        setAddSpeciesDisabled(true);
                        setDonDisabled(false)
                    }}
                >Add Species</Button>
            </div>
            <div style={{display: "flex", alignItems: "end", marginTop: 5}}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={species_options}
                    sx={{ width: 300}}
                    value={sel_species}
                    inputValue={in_value}
                    onChange={(event, newValue) => {
                        if (newValue == null) {
                            setRmvSpeciesDisabled(true)
                            setLayer2("");
                        } else {
                            setRmvSpeciesDisabled(false)
                            addLayer2()

                            var tmp_name_types = Object.keys(species[newValue])
                            //console.log(tmp_name_types);
                            setNameOptions(tmp_name_types);
                        }
                        setSelSpecies(newValue);
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
                    disabled={rmv_species_disabled}
                    onClick={() => {
                        var tmp_species = species;
                        delete tmp_species[sel_species]
                        setSpecies(tmp_species);
                        setSpeciesOptions(Object.keys(tmp_species));
                        setSelSpecies(null);
                        setInValue("");
                        setRmvSpeciesDisabled(true)
                        setDonDisabled(false)
                        setLayer2("");
                    }}
                >Remove Species</Button>
                
            </div>
            {add_layer2}
            <div style={{margin: 5}}>
                <ButtonGroup disabled={don_disabled}>
                    <Button
                        startIcon={<SaveIcon/>}
                        size="small"
                        variant="contained"
                        onClick={() => {
                            submitSpecies(species);
                            setDonDisabled(true);
                            setSelSpecies(null);
                            setInValue("");
                            setRmvSpeciesDisabled(true);
                            setLayer2("");
                            handleNotifOpen("Changes Saved");
                        }}
                    >Save</Button>
                    <Button
                        startIcon={<DeleteIcon/>}
                        color="secondary"
                        size="small"
                        variant="contained"
                        onClick={(event) => {
                            refresh();
                            setDonDisabled(true);
                            setSelSpecies(null);
                            setInValue("");
                            setRmvSpeciesDisabled(true);
                            setLayer2("");
                            handleNotifOpen("Changes Discarded");
                        }}
                    >Discard</Button>
                </ButtonGroup>
            </div>
            <Snackbar
                open={notif_state.open}
                autoHideDuration={6000}
                onClose={handleNotifClose}
                message={notif_state.message}
                action={action}
            />
        </Box>
    );
}

export default EditSpecies;