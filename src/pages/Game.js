import { useState, useEffect } from 'react';
import background from '../assets/images/background.png';
import Evee from '../assets/images/evee.png';
import Psyduck from '../assets/images/psyduck.png';
import Togepi from '../assets/images/togepi.png';
import './Game.css';
import getCharacterCoordinates from "../utils/getCharacterCoordinates";
import GameOverModal from '../components/GameOverModal';


const Game = () => {
  const [showTargetBox, setShowTargetBox] = useState(false);
  const [currentCoords, setCurrentCoords] = useState({x: null, y: null}); // actual position on the screen

  const [eveeCoords, setEveeCoords] = useState({});
  const [psyduckCoords, setPsyduckCoords] = useState({});
  const [togepiCoords, setTogepiCoords] = useState({});

  const [foundEvee, setFoundEvee] = useState(false);
  const [foundPsyduck, setFoundPsyduck] = useState(false);
  const [foundTogepi, setFoundTogepi] = useState(false);

  const [showWinMessage, setShowWinMessage] = useState(false);

  const handleCloseModal = () => {
    setShowWinMessage(false);
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      const eveeData = await getCharacterCoordinates("evee-coordinates");
      const psyduckData = await getCharacterCoordinates("psyduck-coordinates");
      const togepiData = await getCharacterCoordinates("togepi-coordinates");
  
      setEveeCoords(eveeData);
      setPsyduckCoords(psyduckData);
      setTogepiCoords(togepiData);

      if (foundEvee && foundPsyduck && foundTogepi) {
        setShowWinMessage(true);
      }
    };

    fetchCoordinates();
  }, [foundEvee, foundPsyduck, foundTogepi]);

  const checkClickedCharacter = (relativeX, relativeY, characterCoords) => {
    if (
      relativeX >= characterCoords["min-x"] &&
      relativeX <= characterCoords["max-x"] &&
      relativeY >= characterCoords["min-y"] &&
      relativeY <= characterCoords["max-y"]
    ) {
      console.log("Yayy")
      return true;
    } else {
      console.log("Nooo")
      return false;
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    const { width,height } = e.target.getBoundingClientRect();
    const difference = e.target.getBoundingClientRect();
    const clickedX = e.clientX - difference.left;
    const clickedY = e.clientY - difference.top;

    const relativeX = Math.round((e.nativeEvent.offsetX / width) * 100);
    const relativeY = Math.round((e.nativeEvent.offsetY / height) * 100);
    console.log(relativeX);
    console.log(relativeY);
    setCurrentCoords({ x: clickedX, y: clickedY });
    setShowTargetBox(true);

    if (checkClickedCharacter(relativeX, relativeY, eveeCoords)) {
      setFoundEvee(true);
    } else if (checkClickedCharacter(relativeX, relativeY, psyduckCoords)) {
      setFoundPsyduck(true);
    } else if (checkClickedCharacter(relativeX, relativeY, togepiCoords)) {
      setFoundTogepi(true);
    }
}
  
  return (
    <div className="game-container">
      <div className="character-display">
        <img
        src={Evee}
        className="character-image"
        alt="evee"
        />
        <p className={foundEvee ? "crossed-out": ""}>Evee</p>
        <img
        src={Psyduck}
        className="character-image"
        alt="psyduck"
        />
        <p className={foundPsyduck ? "crossed-out" : ""}>Psyduck</p>
        <img
        src={Togepi}
        className="character-image"
        alt="togepi"
        />
        <p className={foundTogepi ? "crossed-out": ""}>Togepi</p>
      </div>
      <div style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
        <img
          src={background}
          id="image"
          className="background"
          alt="pokemon"
          onClick={handleImageClick}
        />
        {showWinMessage && (
          <GameOverModal handleCloseModal={handleCloseModal} />
      )}
        { showTargetBox && (
          <div
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
    </div>
  );
}

export default Game;