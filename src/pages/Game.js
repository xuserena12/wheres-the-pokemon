import { useState } from 'react';
import background from '../assets/images/background.png';
import Evee from '../assets/images/evee.png';
import Psyduck from '../assets/images/psyduck.png';
import Togepi from '../assets/images/togepi.png';

// next, I should store coordinates!!

const Game = () => {
  const [showTargetBox, setShowTargetBox] = useState(false);
  const [currentCoords, setCurrentCoords] = useState({x: null, y: null});

  const handleImageClick = (e) => {
    e.preventDefault();
    const difference = e.target.getBoundingClientRect();
    const clickedX = e.clientX - difference.left;
    const clickedY = e.clientY - difference.top;
    // console.log(clickedX);
    // console.log(clickedY);
    setCurrentCoords({ x: clickedX, y: clickedY });
    setShowTargetBox(true);
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img
        src={background}
        id="image"
        className="relative"
        style={{ width: '100vw', height: 'auto' }}
        alt="pokemon"
        onClick={handleImageClick}
      />
      { showTargetBox && (
        <div
          className="target-box"
          style={{
            position: 'absolute',
            left: currentCoords.x ? currentCoords.x - 40 : 0,
            top: currentCoords.y ? currentCoords.y - 40 : 0,
            width: '80px',
            height: '80px',
            backgroundColor: 'rgba(128, 128, 128, 0.3)',
            border: '2px solid orange',
            borderRadius: '5px',
          }}
        />
      )}
    </div>
  );
}

export default Game;
