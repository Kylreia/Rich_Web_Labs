import {useState} from 'react';
import './App.css';
import { StringLiteral } from 'typescript';

type Note = {
  id: number;
  title: string;
  content: string;
} // end type

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]); 

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleAdd = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    }

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }; // end add note function

  const handleEdit = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if(!selectedNote) {
      return;
    } // end if

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content ,
    }

    const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id
        ? updatedNote
        : note
    )

    setNotes(updatedNotesList)
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }; // end edit note function

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  }

  const handleNoteSelect = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  } // end select note function

  const handleDelete = (
    event: React.MouseEvent,
    noteID: number
    ) => {
    event.stopPropagation();

    const updatedNotes = notes.filter(
      (note) => note.id !== noteID
    )

    setNotes(updatedNotes);
  }; // end delete note function

  return (
    <div className='app-container'>
      <form className='note-form' onSubmit={(event) => 
        selectedNote
        ? handleEdit(event)
        : handleAdd(event)
      }>
        <input value={title} onChange={(event)=>setTitle(event.target.value)} placeholder='Title'required></input>
        <textarea value={content} onChange={(event)=>setContent(event.target.value)} placeholder='Content' rows={10} required></textarea>
        {selectedNote ? (
          <div className='edit-buttons'>
            <button type='submit'>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type='submit'>Add Note</button>
        )}
      </form>
      <div className='notes-grid'>
        {notes.map((note)=> (
          <div className='note-item' onClick={() => handleNoteSelect(note)}>
            <div className='notes-header'>
              <button onClick={(event) => handleDelete(event, note.id)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
} // end App

export default App;
