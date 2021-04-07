import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";

function Note(props) {
  const [editClicked, setEditClicked] = useState(false);
  const [newValue, setNewValue] = useState({
    title: props.note.title,
    content: props.note.content,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewValue((preValue) => {
      return { ...preValue, [name]: value };
    });
  };
  return (
    <div className="note">
      {editClicked ? (
        <input
          onChange={handleChange}
          value={newValue.title}
          name="title"
          type="text"
          id="title"
          autoComplete="off"
        />
      ) : (
        <h1>{props.note.title}</h1>
      )}
      {editClicked ? (
        <textarea
          onChange={handleChange}
          value={newValue.content}
          name="content"
          id="content"
        />
      ) : (
        <p>{props.note.content}</p>
      )}
      <div className="actionBtn">
        <button className="deleteBtn" onClick={() => props.delete(props.id)}>
          <DeleteIcon />
        </button>
        {editClicked ? (
          <div className="updateClicked">
            <button
              onClick={() => {
                props.update(props.id, newValue.title, newValue.content);
                setEditClicked(false);
              }}
              className="updateBtn"
            >
              Update
            </button>
            <button
              className="editBtn"
              onClick={() => {
                setEditClicked(false);
              }}
            >
              <CancelIcon />
            </button>
          </div>
        ) : (
          <button
            className="editBtn"
            onClick={() => {
              setEditClicked(true);
            }}
          >
            <EditIcon />
          </button>
        )}
      </div>
    </div>
  );
}

export default Note;
