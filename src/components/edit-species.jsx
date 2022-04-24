import * as React from 'react';

class EditSpecies extends React.Component {

    submitSpecies(event) {
        
    }

    render() {
        return (
            <form>
                <label>Name: 
                    <input/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )    
    }
}

export default EditSpecies;