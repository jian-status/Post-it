import { useState } from "react";
export default function Header({title, setTitle}) {
  const [isEditing, setEditing] = useState(false);

  return (
    <div
      onClick={event => {setEditing(true); event.stopPropagation();}}
      style={{
        margin: "7px 0px 7px 0px",
      }}
    >
      {isEditing ?
      <div>
        <input 
          style={{width: "100%", boxSizing: "border-box"}}
          onChange={event => setTitle(event.target.value)}
          value={title}
        />
      </div>
      : <b style={{textAlign: "center", width: "100%", display: "inline-block"}}>{title}</b>}
    </div>
  )
}