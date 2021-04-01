import React, { useState } from "react";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    return setNote((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function submitNote(e) {
    props.addNote(note);
    setNote({
      title: "",
      content: "",
    });
    e.preventDefault();
  }

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div>
      <form>
        <Zoom in={isClicked} timeout={1000}>
          <input
            style={{ display: isClicked ? null : "none" }}
            onChange={handleChange}
            value={note.title}
            name="title"
            placeholder="Title"
          />
        </Zoom>
        <textarea
          onClick={() => setIsClicked(true)}
          onChange={handleChange}
          value={note.content}
          name="content"
          placeholder="Take a note..."
          rows= {isClicked ? "3" : "1"}
        />
        <Zoom in={isClicked} timeout={1000}>
          <button
            style={{ display: isClicked ? null : "none" }}
            onClick={submitNote}
          >
            Add
          </button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
