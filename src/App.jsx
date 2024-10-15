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
    setPosts(posts => [
      ...posts, {
        x: coordinates.x, 
        y: coordinates.y, 
        body: body, 
        hex: generateColor(),
        title: `Post-It #${posts.length}`
      }]);
    setBody("");
    setCoordinates({});
    setCreating(false);
  }
  function saveEdits(id, textChange, colorChange, titleChange) {
    const updatedPosts = posts.map((post, index) => {
      if (index == id) {
        return {...post, body: textChange, hex: colorChange, title: titleChange};
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
  function updateCoordinates(newX, newY, id, isCollapsed) {
    const height = isCollapsed ? 41: 200, width = 253;
    if (newX - width/2 < 0) {newX = width/2 - 3;}
    if (newX + width/2 > window.innerWidth) {newX = window.innerWidth - width/2 - 15}
    if (newY - height/2 < 0) {newY = height/2 + 3;}
    console.log(newY + height/2);
    if (newY + height/2 > window.innerHeight) {console.log("bruh"); newY = window.innerHeight - height/2 - 1}
    console.log(newY);
    const updatedPosts = posts.map((post, index) => {
      if (index == id) {
        return {...post, x: newX, y: newY}
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
          <Post post={post} id={index} updateCoordinates={updateCoordinates} saveEdits={saveEdits} posts={posts} setPosts={setPosts}/>
      )}
    </div>
  )
}

export default App
