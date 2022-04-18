import "./overlay.css"
import Logo from "../../../../images/icon.png"

interface OverlayProps {
  className: string,
}

const Overlay = (props: OverlayProps) => {
  return (
    <div className={props.className}>
      <div className="overlay-container">
        <div className="overlay-logo">

        </div>
      </div>
    </div>
  )
}

export default Overlay