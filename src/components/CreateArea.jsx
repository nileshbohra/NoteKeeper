import React, { useState } from "react";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

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

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
    {/* clickawaylistener will close form when clicked outside the form */}
      <ClickAwayListener onClickAway={() => setIsExpanded(false)}>
        <form className="createNoteForm">
          {isExpanded && (
            <input
              onChange={handleChange}
              value={note.title}
              name="title"
              placeholder="Title"
            />
          )}
          <textarea
            onClick={() => setIsExpanded(true)}
            onChange={handleChange}
            value={note.content}
            name="content"
            placeholder="Take a note..."
            rows={isExpanded ? "3" : "1"}
          />
          <Zoom in={isExpanded} timeout={1000}>
            <Fab onClick={submitNote} className="fabButton">
              <AddIcon />
            </Fab>
          </Zoom>
        </form>
      </ClickAwayListener>
    </div>
  );
}
export default CreateArea;
