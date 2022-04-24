import * as React from 'react';

class EditNames extends React.Component {
    
    getSpecies() {
        fetch("../data/species.json")
        .then(response => response.json())
        .then(data => {
            let options;
            for (specie in Object.keys(data)) {
                options.append("<option value = \"" + specie + "\">" + specie + "</option>");
            }
        })
    }
    
    render() {
        return (
            <form>
                <label>Species: 
                    <select>
                    </select>
                </label>
            </form>
        )
    }
}

export default EditNames;