import {useState} from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Q",
      content: "Chodan",
    },
    {
      id: 2,
      title: "W",
      content: "Magenta",
    },
    {
      id: 3,
      title: "E",
      content: "Hina",
    },
    {
      id: 4,
      title: "R",
      content: "Siyoming",
    }
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // const handleSubmit = (event: React.FormEvent)=>{}

  return(
    <div className='app-container'>
      <form className='note-form'>
        <input value={title} onChange={(event)=>setTitle(event.target.value)} placeholder='Title'required></input>
        <textarea value={content} onChange={(event)=>setContent(event.target.value)} placeholder='Content' rows={10} required></textarea>
        <button type="submit">Add Note</button>
      </form>
      <div className='notes-grid'>
        {notes.map((note)=> (
          <div className='note-item'>
            <div className='notes-header'>
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;
