import { useState } from 'react';
import { MenuSVG, PaletteSVG, ResizeSVG, CollapsedSVG, NotCollapsedSVG } from '../assets/svgs';
import ColorPicker from './ColorPicker';
import Title from './Header';

import "./post.css";


function Edit ({post, id, handleEdit, initialBody}) {
  const [text, setText] = useState(initialBody);
  const [color, setColor] = useState(post.hex);
  const [showColorPicker, toggleColorPicker] = useState(false);
  const [moreButtons, toggleMoreButtons] = useState(false);
  const [title, setTitle] = useState(post.title);

  const width = 245, height = 200; // width & height of post

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
      <div id="editButtons" style={{display: "flex", gap: "5px"}}>
        <button onClick={() => toggleMoreButtons(!moreButtons)}>
          <MenuSVG width="15px" height="15px" />
        </button>
        <button onClick={(event) => handleEdit(event, text, color, title)}>
          Save
        </button>
      </div>
      {moreButtons ?       
        <div style={{display: "flex", gap: "5px"}}>
          <button id="color" onClick={() => toggleColorPicker(!showColorPicker)}>
            <PaletteSVG height="15px" width="15px" />
          </button>
          <button id="resize">
            <ResizeSVG height="15px" width="15px"/>
          </button>
        </div> : ""}
      <ColorPicker showColorPicker={showColorPicker} setColor={setColor} color={color} width={width}/>
    </>
  )
}

export default function Post({post, id, updateCoordinates, saveEdits, posts, setPosts}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCollapsed, toggleCollapse] = useState(false);

  const width = 245, height = isCollapsed ? 43 : 200; // width & height of post

  function handleEdit(event, text, color, title) {
    event.stopPropagation();
    saveEdits(id, text, color, title);
    setIsEditing(false);
  }

  return (
    <div
      key={id}
      onClick={event => {event.stopPropagation(); setIsEditing(true)}}
      draggable="true"
      onDragEnd={event => updateCoordinates(event.clientX, event.clientY, id, isCollapsed)}
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
        //boxSizing: "border-box",
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
            <Edit post={post} id={id} handleEdit={handleEdit} initialBody={post.body}/> 
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