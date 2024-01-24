import { Link } from 'react-router-dom';
import IMAGES from '../images/images';
function Write({user}) {
  const url=`/post/create/${user._id}`
  return (
    <div className="write">
      <a href= {url}>
        <button>
          <img src={IMAGES.write} alt="pen" />
          Write
        </button>
      </a>
    </div>
  )
}

export default Write