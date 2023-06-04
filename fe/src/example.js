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

  handleAddNote = (content) => {
    fetch('http://localhost:7070/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    })
      .then(response => response.json())
      .then(data => this.setState({ notes: data }))
      .catch(error => console.log(error));
  };

  handleDeleteNote = (id) => {
    fetch(`http://localhost:7070/notes/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => this.setState({ notes: data }))
      .catch(error => console.log(error));
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
          <input type="text" name="content" placeholder="Введите заметку" />
          <button type="submit">Добавить</button>
        </form>
        <button onClick={this.handleRefreshNotes}>Обновить</button>
        {this.state.notes.map(note => (
          <div key={note.id}>
            <p>{note.content}</p>
            <button onClick={() => this.handleDeleteNote(note.id)}>Удалить</button>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
