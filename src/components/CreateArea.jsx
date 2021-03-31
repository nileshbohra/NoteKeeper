import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  function handleChange(e){
    const {name, value} = e.target;
    return setNote(prevValue => {
      return {...prevValue, [name]: value}
    })
  }

  function submitNote(e){
    props.addNote(note)
    setNote({
      title: "",
      content: ""
    })
    e.preventDefault()
  }

  return (
    <div>
      <form>
        <input onChange={handleChange} value={note.title} name="title" placeholder="Title" />
        <textarea onChange={handleChange} value={note.content} name="content" placeholder="Take a note..." rows="3" />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
