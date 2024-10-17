import { TrashSVG, StackSVG } from '../assets/svgs'
import './sidebarR.css';

export default function SidebarR({ setPosts }) {
  function deleteAll() {
    setPosts([]);
  }
  return (
    <div className="sidebarR">
      <button onClick={() => deleteAll()}>
        <TrashSVG height="15px" width="15px"/>
      </button>
      <button>
        <StackSVG height="15px" width="15px"/>
      </button>
    </div>
  )
}