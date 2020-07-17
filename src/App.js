import React, { Component } from 'react';
import './App.css';

import EditorComponent from './editor/editor'
import SidebarComponent from './sidebar/sidebar'

const firebase = require('firebase')

class App extends Component {

  constructor() {
    super()
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  componentDidMount = () => {
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data()
        data['id'] = _doc.id
        return data
      })
      console.log(notes)
      this.setState({
        notes: notes
      })
    })
  }

  selectNote = (note, index) => {
    this.setState({
      selectedNoteIndex: index,
      selectedNote: note
    })
  }

  deleteNote = () => {

  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }
    const newFromDB = await firebase.firestore().collection('notes').add(note)

    const newID = newFromDB.id
    await this.setState({
      notes: [...this.state.notes, note]
    })
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0])
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    })
  }

  noteUpdate = (id, noteObj ) => {
    firebase.firestore().collection('notes').doc(id).update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  render() {
    return (
      <div className='app-conntainer'>
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {
          this.state.selectedNote ?
            <EditorComponent
              selectedNote={this.state.selectedNote}
              selectedNoteIndex={this.state.selectedNoteIndex}
              notes={this.state.notes}
              noteUpdate={this.noteUpdate}
            />
          :
            null //WaterMark
        }
      </div>
    );
  }
}

export default App;
