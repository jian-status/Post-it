import { useState } from 'react';
import { MenuSVG, PaletteSVG, CollapsedSVG, NotCollapsedSVG, TrashSVG } from '../assets/svgs';
import ColorPicker from './ColorPicker';
import Title from './Header';

import "./post.css";
import { Tooltip } from 'react-tooltip';

function Edit ({post, handleEdit, initialBody, posts, setPosts}) {
  const [text, setText] = useState(initialBody);
  const [color, setColor] = useState(post.hex);
  const [showColorPicker, toggleColorPicker] = useState(false);
  const [moreButtons, toggleMoreButtons] = useState(false);
  const [title, setTitle] = useState(post.title);

  const width = 245, height = 200; // width & height of post

  function deletePost() {
    const curr_id = post.id;
    //const updatedPosts = posts.filter(post.id == id);
    setPosts(posts.filter(post => {console.log("filtering " + post); return post.id != curr_id}));
  }
  return (
    <>
      <Title title={title} setTitle={setTitle} />
      <textarea
      onChange={(e) => setText(e.target.value)}
      value={text}
      style={{
        width: "100%",
        height: height * .65,
        boxSizing: "border-box",
        textOverflow: "ellipsis"
      }}/>
      <div onClick={event => event.stopPropagation()}>
      <div id="editButtons" style={{display: "flex", gap: "5px"}}>
        <button onClick={() => toggleMoreButtons(!moreButtons)}>
          <MenuSVG width="15px" height="15px" />
        </button>
        <button onClick={() => handleEdit(text, color, title)}>
          Save
        </button>
        <button onClick={deletePost}>
          <TrashSVG />
        </button>
      </div>
      {moreButtons ?       
        <div style={{display: "flex", gap: "5px"}}>
          <button id="color" onClick={() => toggleColorPicker(!showColorPicker)}>
            <PaletteSVG height="15px" width="15px" />
          </button>
        </div> : ""}
      <ColorPicker showColorPicker={showColorPicker} setColor={setColor} color={color} width={width}/>
      </div>
    </>
  )
}

export default function Post({post, updateCoordinates, saveEdits, posts, setPosts}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, toggleCollapse] = useState(false);

  const width = 245, height = isCollapsed ? 43 : 200; // width & height of post

  function handleEdit(text, color, title) {
    saveEdits(post.id, text, color, title);
    setIsEditing(false);
  }
  return (
    <div
      onClick={() => {setIsEditing(true)}}
      draggable="true"
      onDragEnd={event => updateCoordinates(event.clientX, event.clientY, post.id, isCollapsed)}
      style={{
        position: "absolute", 
        top: post.y - height/2, 
        left: post.x - width/2, 
        width: width,
        minHeight: isCollapsed ? "33px": height,
        height: isCollapsed ? "fit-content" : "auto",
        backgroundColor: post.hex,
        opacity: "0.8",
        border: "1px solid rgba(38, 50, 53, 0.8)",
        borderRadius: "5px",
        boxShadow: "0px 0px 26px 0px rgba(0,0,0,0.5)",
        padding: "3px",
        color: "white",
      }}>
          <div>
            <button
              style={{
                position: "absolute", 
                left: width + 6, 
                top: 6, 
                border: "1px solid rgba(38, 50, 53, 0.8)", 
                borderRadius: "0px 5px 5px 0px",
                width: "10px",
                display: "flex",
                justifyContent: "center",
                padding: "0px",
                }}
                onClick={event => {event.stopPropagation(); toggleCollapse(!isCollapsed)}}
                >
                  {isCollapsed ? <NotCollapsedSVG height="5px" width="10px"/> : <CollapsedSVG height="5px" width="10px"/>}
            </button>
          </div>
          {isEditing ? 
            <Edit post={post} handleEdit={handleEdit} initialBody={post.body} posts={posts} setPosts={setPosts}/>
            : 
            <div style={{
              textWrap: "pretty",
              wordBreak: "break-word",
              hyphens: "auto",
              textOverflow: "ellipsis",
            }}>
              <b>{post.title}</b>
              {isCollapsed ? '' : <p>{post.body}</p>}
            </div>
            }
    </div>
  )
}