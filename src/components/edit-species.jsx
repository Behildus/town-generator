import * as React from 'react';
import { Box, Input, Button, ButtonGroup, TextField, Snackbar, IconButton, Autocomplete, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

function submitSpecies(species_data) {
    window.electronAPI.putSpecies(species_data);
}

const Layer2 = ({sel_species, species, setSpecies, setDoneDisabled}) => {  
    const [new_name_type, setNewNameType] = React.useState("");
    const [add_type_disabled, setAddTypeDisabled] = React.useState(true);
    const [new_name, setNewName] = React.useState("");
    const [add_name_disabled, setAddNameDisabled] = React.useState(true);

    var add_names = []

    for (let name_type in species[sel_species]) {
        var names = species[sel_species][name_type].map((name) =>
            <li key={name}>
                {name}
                <Button
                    startIcon={<RemoveIcon/>}
                    size="small"
                    onClick={() => {
                        var tmp_species = {...species};
                        console.log(species[sel_species][name_type]);
                        const index = tmp_species[sel_species][name_type].indexOf(name);
                        if (index > -1) {
                            tmp_species[sel_species][name_type].splice(index, 1);
                        }
                        setSpecies(tmp_species);
                        setDoneDisabled(false);
                    }}
                />
            </li>
            
        )
        add_names.push(
            <div key={name_type}>
                <div>
                    <h3 style={{display: "inline"}}>{name_type}</h3>
                    <Button 
                        startIcon={<RemoveIcon/>}
                        size="small"
                        onClick={() => {
                            var tmp_species = {...species};
                            delete tmp_species[sel_species][name_type]
                            setSpecies(tmp_species);
                            setDoneDisabled(false);
                        }}
                    />
                </div>
                <div>
                    <Input 
                        id="name-input"
                        size="small"
                        placeholder="Add Name"
                        value={new_name}
                        sx={{width: 200}}
                        onChange={(event) => {
                            setNewName(event.target.value)
                            if (event.target.value === "") {
                                setAddNameDisabled(true)
                            } else {
                                setAddNameDisabled(false)
                            }
                        }}/>
                    <Button
                        startIcon={<AddIcon/>}
                        size="small"
                        variant="contained"
                        disabled={add_name_disabled}
                        onClick={() => {
                            var tmp_species = species;
                            tmp_species[sel_species][name_type].push(new_name);
                            setSpecies(tmp_species);
                            setNewName("");
                            setAddNameDisabled(true);
                            setDoneDisabled(false)
                        }}
                    >Add Name</Button>
                    {names}
                </div>
            </div>      
        )
        
    }

    return (
        <div style={{marginTop: 5, marginLeft: 20}}>
            <Input 
                id="name-type"
                size="small"
                placeholder="Add Name Type"
                value={new_name_type}
                sx={{width: 300}}
                onChange={(event) => {
                    setNewNameType(event.target.value)
                    if (event.target.value === "") {
                        setAddTypeDisabled(true)
                    } else {
                        setAddTypeDisabled(false)
                    }
                }}/>
            <Button
                startIcon={<AddIcon/>}
                size="small"
                variant="contained"
                disabled={add_type_disabled}
                onClick={() => {
                    var tmp_species = species;
                    tmp_species[sel_species][new_name_type] = [];
                    setSpecies(tmp_species);
                    setNewNameType("");
                    setAddTypeDisabled(true);
                    setDoneDisabled(false)
                }}
            >Add Name Type</Button>
            
            {add_names}
        </div>
    )
    
}

function EditSpecies() {
    // Layer 1: Add Species, Select Species, Remove Species,
    const [species, setSpecies] = React.useState({});
    const [new_species, setNewSpecies] = React.useState("");
    const [add_species_disabled, setAddSpeciesDisabled] = React.useState(true);
    const [sel_species, setSelSpecies] = React.useState(null);
    const [in_value, setInValue] = React.useState("");
    const [rmv_species_disabled, setRmvSpeciesDisabled] = React.useState(true);
    // Layer 2: Add Name Type, Remove Name Type, Show Names, Remove Names
    const [set_layer2, setLayer2] = React.useState(false);
    // Save and Discard
    const [done_disabled, setDoneDisabled] = React.useState(true);
    // Notification
    const [notif_state, setNotifState] = React.useState({
        open: false,
        message: ""
    });

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
        })();
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
                        var tmp_species = {...species};
                        tmp_species[new_species] = {};
                        setSpecies(tmp_species);
                        setNewSpecies("");
                        setAddSpeciesDisabled(true);
                        setDoneDisabled(false)
                    }}
                >Add Species</Button>
            </div>
            <div style={{display: "flex", alignItems: "end", marginTop: 5}}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={Object.keys(species)}
                    sx={{ width: 300}}
                    value={sel_species}
                    inputValue={in_value}
                    onChange={(event, newValue) => {
                        setSelSpecies(newValue);
                        if (newValue == null) {
                            setRmvSpeciesDisabled(true);
                            setLayer2(false);
                        } else {
                            setRmvSpeciesDisabled(false);
                            setLayer2(true);
                        }
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
                        var tmp_species = {...species};
                        delete tmp_species[sel_species]
                        setSpecies(tmp_species);
                        setSelSpecies(null);
                        setInValue("");
                        setRmvSpeciesDisabled(true);
                        setLayer2(false);
                        setDoneDisabled(false);
                    }}
                >Remove Species</Button>
                
            </div>
            { set_layer2 ? <Layer2 sel_species={sel_species} species={species} setSpecies={setSpecies} setDoneDisabled={setDoneDisabled}/> : null }

            <div style={{margin: 5}}>
                <ButtonGroup disabled={done_disabled}>
                    <Button
                        startIcon={<SaveIcon/>}
                        size="small"
                        variant="contained"
                        onClick={() => {
                            submitSpecies(species);
                            setDoneDisabled(true);
                            setSelSpecies(null);
                            setInValue("");
                            setRmvSpeciesDisabled(true);
                            setLayer2(false);
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
                            setDoneDisabled(true);
                            setSelSpecies(null);
                            setInValue("");
                            setRmvSpeciesDisabled(true);
                            setLayer2(false);
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