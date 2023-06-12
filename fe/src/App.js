import './App.css';
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:7070/notes')
      .then(response => response.json())
      .then(data => this.setState({ notes: data }))
      .catch(error => console.log(error));
  }
  componentDidUpdate() {
    console.log('call');
    
  }
  handleAddNote = (content) => {
    fetch('http://localhost:7070/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
  };

  handleDeleteNote = (id) => {
    fetch(`http://localhost:7070/notes/${id}`, { method: 'DELETE' })
  };

  handleRefreshNotes = () => {
    fetch('http://localhost:7070/notes')
      .then(response => response.json())
      .then(data => this.setState({ notes: data }))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <form onSubmit={(event) => {
          event.preventDefault();
          const content = event.target.elements.content.value;
          this.handleAddNote(content);
          event.target.reset();
        }}>
          <textarea  name="content" placeholder="Введите заметку"></textarea>
          <button type="submit">Добавить</button>
        </form>
        <button onClick={this.handleRefreshNotes}>Обновить</button>
        <div className='notes'>
          {this.state.notes.map(note => (
          <div className="note" key={note.id}>
            <p>{note.content}</p>
            <p>{note.id}</p>
            <button onClick={() => this.handleDeleteNote(note.id)}>Удалить</button>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

export default App;


