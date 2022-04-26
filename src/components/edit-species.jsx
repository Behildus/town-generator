import * as React from 'react';
import { Box, Input, Button, TextField, InputLabel, FormHelperText, FormControl, Autocomplete } from '@mui/material';

var species = []

async function getSpecies() {
    var species = await window.electronAPI.getSpecies();
    console.log(species)
    return species
}

function submitSpecies() {
}

function EditSpecies() {
    species = [
        "Chloran",
        "Elf",
        "Faun",
        "Human"
      ] //getSpecies()
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off">
                <div>
                    <Input 
                        id="species"
                        size="small"
                        placeholder="Species Name"
                        aria-describedby="species-helper-text"/>
                    <FormHelperText id="species-helper-text">Species to add to database</FormHelperText>
                </div>
                <div>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={species}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Add Names to Species" variant="standard" />}
                    />
                </div>
                <div>
                    <Button variant="contained"
                    >Submit</Button>
                </div>
                
        </Box>
    );
}

export default EditSpecies;