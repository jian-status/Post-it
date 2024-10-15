import { CompactPicker } from 'react-color';

export default function ColorPicker({showColorPicker, setColor, color, width}) {
  return (
    <div id="colorPicker" style={{marginTop:"3px"}}>
    {showColorPicker ? 
        <caption style={{fontSize: "10px", width: width, wordWrap: "break-word", marginLeft: "-3px"}}>
          You must "save" to put your color changes into effect
        </caption>: ""}
      <div
        style={{
          position: "relative"
        }}
        draggable="false"
      >
        {showColorPicker ?
          <div>
            <CompactPicker
              color={color}
              onChangeComplete={(color) => {setColor(color.hex); console.log(color.hex)}}
            />
          </div> : ""}
      </div>
    </div>
  )
}