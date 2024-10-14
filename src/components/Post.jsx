import { useState } from 'react';
import { CompactPicker } from 'react-color';
import { MenuSVG } from '../assets/svgs';
import "./post.css";

const width = 245, height = 200;

function Edit ({id, handleEdit, initialBody}) {
  const [text, setText] = useState(initialBody);
  const [color, setColor] = useState();
  const [showColorPicker, toggleColorPicker] = useState(false);
  return (
    <>
      <p style={{
        margin: "7px 0px 7px 0px",
      }}>
        <b style={{textAlign: "center", width: "100%", display: "inline-block"}}>Editing Post-It #{id}</b>
      </p>
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
        <button onClick={() => toggleColorPicker(!showColorPicker)}>
          <MenuSVG height="15px" width="15px" />
        </button>
        <button onClick={(event) => handleEdit(event, text, color)}>
          Save
        </button>
      </div>
      <div id="colorPicker" style={{marginTop:"3px"}}>
        {showColorPicker ? 
            <caption style={{fontSize: "10px", width: width, wordWrap: "break-word", marginLeft: "-3px"}}>
              You must "save" to put your color changes into effect
            </caption>
            :
            ""}
        <div
          style={{
            position: "relative",
            //top: height,
            //left: 0
          }}
          draggable="false"
        >
          {showColorPicker ?
            <div>
              <CompactPicker
                color={color}
                onChangeComplete={(color) => {setColor(color.hex); console.log(color.hex)}}
              />
            </div>
          : ""}
        </div>
      </div>
    </>
  )
}

export default function Post({post, id, updateCoordinates, saveEdits}) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(event, text, color) {
    event.stopPropagation();
    saveEdits(id, text, color);
    setIsEditing(false);
  }
  return (
    <div
      onClick={event => {event.stopPropagation(); setIsEditing(true)}}
      draggable="true"
      onDragEnd={event => updateCoordinates(event, id)}
      style={{
        position: "absolute", 
        top: post.y - height/2, 
        left: post.x - width/2, 
        width: width,
        minHeight: height,
        height: "auto", 
        backgroundColor: post.hex,
        opacity: "0.8",
        border: "1px solid rgba(38, 50, 53, 0.8)",
        borderRadius: "5px",
        boxShadow: "0px 0px 26px 0px rgba(0,0,0,0.5)",
        padding: "3px",
        //boxSizing: "border-box",
        color: "white",
        }}>
          {isEditing ? 
            <Edit id={id} handleEdit={handleEdit} initialBody={post.body}/> 
            : 
            <div style={{
              textWrap: "pretty",
              wordBreak: "break-word",
              hyphens: "auto",
              textOverflow: "ellipsis",
            }}>
              {post.body}
            </div>
            }
    </div>
  )
}