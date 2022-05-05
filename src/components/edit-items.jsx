import * as React from 'react';

function EditItems() {
    const [new_item, setNewItem] = React.useState({
        name: "",
        description: "",
        damage: "",
        cost: []
    })

    return (
        <div>Items</div>
    );
}

export default EditItems;