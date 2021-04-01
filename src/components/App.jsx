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

  //posting data to DB through backend
  function addNote(note) {
    Axios.post(`${backend_url}/create`, {
      title: note.title,
      content: note.content,
    });
    //retreving new data when note added
    Axios.get(`${backend_url}/read`).then((res) => {
      setItems(res.data);
    });
  }

  //deleting data from DB through backend
  function deleteNote(id) {
    Axios.delete(`${backend_url}/delete/${id}`);
    //retreving new data when note deleted
    Axios.get(`${backend_url}/read`).then((res) => {
      setItems(res.data);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {isLoaded
        ? items.map((item) => {
            return (
              <Note
                key={item._id}
                id={item._id}
                delete={deleteNote}
                title={item.title}
                content={item.content}
              />
            );
          })
        : "Loading..."}
      <Footer />
    </div>
  );
}

export default App;
