import { useState, useEffect, useRef } from 'react'
import './App.css'
import Post from './components/Post';


function App() {
  const [posts, setPosts] = useState([]);
  const [isCreating, setCreating] = useState(false);
  const [body, setBody] = useState(""); // creation
  const [coordinates, setCoordinates] = useState({})
  
  function generateColor() { // hex
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return '#' + randomColor;
    }

  function captureCoordinates(mouseX, mouseY) {
    setCreating(true);
    setCoordinates({x: mouseX, y: mouseY});
  }
  function create_post() {
    setPosts(posts => [...posts, {x: coordinates.x, y: coordinates.y, body: body, hex: generateColor()}]);
    setBody("");
    setCoordinates({});
    setCreating(false);
  }
  function saveEdits(id, textChange, colorChange) {
    const updatedPosts = posts.map((post, index) => {
      if (index == id) {
        const newColor = colorChange ? colorChange : post.hex;
        return {...post, body: textChange, hex: newColor};
      } 
      else return post;
    })
    setPosts(updatedPosts);
  }
  function handleKeyDown(event) {
    if (event.key == "Escape" && isCreating == true) {
      create_post();
    }
  }
  function updateCoordinates(event, id) {
    console.log(event.clientX + " " + event.clientY);
    const updatedPosts = posts.map((post, index) => {
      console.log(index + " " + id)
      if (index == id) {
        return {...post, x: event.clientX, y: event.clientY}
      }
      return post;
    })
    setPosts(updatedPosts);
  }
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCreating, body]); // prevent stale closure
  return (
    <div id="app" onClick={event => isCreating ? create_post() : captureCoordinates(event.clientX, event.clientY)}>
      {isCreating
       ? 
        <div
          onClick={event => event.stopPropagation()}
          style={{
            margin: "auto",
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
            width: "500px",
            height: "500px",
            boxShadow: "0px 0px 26px 0px rgba(0,0,0,0.5)",
            padding: "35px",
            boxSizing: "border-box",
            backgroundColor: "rgba(255, 255, 0, 0.3)",
          }}
        >
          <h1>What Does This Post-It Say?</h1>
            <textarea
              autoFocus
              style={{
                width: "100%",
                boxSizing: "border-box",
                height: "150px",
                backgroundColor: "rgba(0,0,0,0.05)",
              }}
              onChange={(e) => setBody(e.target.value)}
              value={body}
            />
            <p>Click anywhere outside the Post-It to finish! Or press your 'Esc' key!</p>
        </div>
      : 
      posts.map((post, index) =>
        <div key={index}>
          <Post post={post} id={index} updateCoordinates={updateCoordinates} saveEdits={saveEdits}/>
        </div>
      )}
    </div>
  )
}

export default App
