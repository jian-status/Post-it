import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);
  const [isCreating, setCreating] = useState(false);
  const [body, setbody] = useState(""); // creation
  const [coordinates, setCoordinates] = useState({})
  const width = 200, height = 200;
  function captureCoordinates(mouseX, mouseY) {
    setCreating(true);
    setCoordinates({x: mouseX, y: mouseY});
  }
  function create_post() {
    setPosts(posts => [...posts, {x: coordinates.x, y: coordinates.y, body: body}]);
    setbody("");
    setCoordinates({});
    setCreating(false);
  }
  function edit_post(event, post, id) {
    event.stopPropagation();
    console.log("I am post it #" + id)
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
        return {x: event.clientX, y: event.clientY, body: post.body}
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
              onChange={(e) => setbody(e.target.value)}
              value={body}
            />
            <p>Click anywhere outside the Post-It to finish! Or press your 'Esc' key!</p>
        </div>
      : 
      posts.map((post, id) =>
        <div
          key={id}
          onClick={event => edit_post(event, post, id)}
          draggable="true"
          onDragEnd={event => updateCoordinates(event, id)}
          style={{
            position: "absolute", 
            top: post.y - height/2, 
            left: post.x - width/2, 
            width: width, 
            height: height, 
            backgroundColor: "white",
            border: "1px solid rgba(38, 50, 53, 0.8)",
            borderRadius: "5px",
            boxShadow: "0px 0px 26px 0px rgba(0,0,0,0.5)",
            padding: "3px",
            boxSizing: "border-box"
            }}>
              {post.body}
        </div>
      )}
    </div>
  )
}

export default App
