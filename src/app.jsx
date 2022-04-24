import * as React from 'react';
import EditSpecies from './components/edit-species.jsx';
import EditNames from './components/edit-names.jsx';

// const db = new Low(new JSONFile('file.json'))
// await db.read()
// db.data ||= { posts: [] }             // Node >= 15.x

// // Create and query items using plain JS
// db.data.posts.push('hello world')
// const firstPost = db.data.posts[0]

// // Alternatively, you can also use this syntax if you prefer
// const { posts } = db.data
// posts.push('hello world')
// await db.write()



class App extends React.Component {
    render() {
        return (
            <div><EditSpecies /><EditNames /></div>
        );
    }
}

export default App;