import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  //retreving data from backend
  //called on first render
  useEffect(() => {
    Axios.get(`${backend_url}/read`).then((res) => {
      setItems(res.data);
      setIsLoaded(true);
    });
  }, []);

  async function fetchData() {
    await Axios.get(`${backend_url}/read`).then((res) => {
      setItems(res.data);
    });
  }

  //posting data to DB through backend
  async function addNote(note) {
    await Axios.post(`${backend_url}/create`, {
      title: note.title,
      content: note.content,
    });
    //retreving new data when note added
    fetchData();
  }

  async function updateNote(id, title, content) {
    await Axios.put(`${backend_url}/update/${id}`, {
      title: title,
      content: content,
    });
    fetchData();
  }

  //deleting data from DB through backend
  async function deleteNote(id) {
    await Axios.delete(`${backend_url}/delete/${id}`);
    //retreving new data when note deleted
    fetchData();
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      <div className="noteSection">
        {isLoaded
          ? items.map((note) => {
              return (
                <Note
                  key={note._id}
                  id={note._id}
                  delete={deleteNote}
                  update={updateNote}
                  note={note}
                />
              );
            })
          : "Loading..."}
      </div>
      <Footer />
    </div>
  );
}

export default App;
