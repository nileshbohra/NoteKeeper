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

  //posting data to DB through backend
  function addNote(note) {
    return Axios.post(`${backend_url}/create`, {
      title: note.title,
      content: note.content,
    });
  }

  //retreving data from backend
  useEffect(() => {
    Axios.get(`${backend_url}/read`).then((res) => setItems(res.data));
    setIsLoaded(true);
  }, [items]);

  //deleting data from DB through backend
  function deleteNote(id) {
    Axios.delete(`${backend_url}/delete/${id}`);
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
