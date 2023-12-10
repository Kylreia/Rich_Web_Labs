import {useEffect, useState} from 'react';
import './App.css';

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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/notes");
        const notes: Note[] = await response.json()
        setNotes(notes);
      } catch (e) {
        console.log(e)
      } // end error catching
    };

    fetchNotes();
  }, []);

  const handleAdd = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    try {

      const response = await fetch(
        "http://localhost:5000/api/notes",
        {
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content
          }),
        }
      );

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setContent("");
    } catch (e) {
      console.log(e);
    } // end error catching
    
  }; // end add note function

  const handleEdit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if(!selectedNote) {
      return;
    } // end if

    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${selectedNote.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            content,
          })
        }
      )

      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) =>
      note.id === selectedNote.id
        ? updatedNote
        : note
      );

      setNotes(updatedNotesList)
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (e) {
      console.log(e);
    } // end error catching
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

  const handleDelete = async (
    event: React.MouseEvent,
    noteID: number
    ) => {
    event.stopPropagation();

    try {
      await fetch(
        `http://localhost:5000/api/notes/${noteID}`,
        {
          method:"DELETE",
        }
      )
      const updatedNotes = notes.filter(
        (note) => note.id !== noteID
      )
  
      setNotes(updatedNotes);
    } catch (e) {

    } // end error catching
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
