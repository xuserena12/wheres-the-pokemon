import { useState, useEffect } from 'react';
import background from '../assets/images/background.png';
import Evee from '../assets/images/evee.png';
import Psyduck from '../assets/images/psyduck.png';
import Togepi from '../assets/images/togepi.png';
import './Game.css';

// importing stuff that we need
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";

// just doing some testing with firebase!


const Game = () => {
  const [showTargetBox, setShowTargetBox] = useState(false);
  const [currentCoords, setCurrentCoords] = useState({x: null, y: null}); // actual position on the screen

  const [relativeCoords, setRelativeCoords] = useState({ x: null, y: null}); // the relative coords, will be same on any screen

  const [names, setCoordinates ] = useState([]);
  const leaderboardCollectionRef = collection(db, "leaderboard");

  useEffect(() => {
    const getNameList = async () => {
    // Read the data
    // set the movie list
      try {
        const data = await getDocs(leaderboardCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(), id: doc.id
        }));
        console.log(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getNameList();

  }, []);

  const handleImageClick = (e) => {
    e.preventDefault();
    const {width,height } = e.target.getBoundingClientRect();
    const difference = e.target.getBoundingClientRect();
    const clickedX = e.clientX - difference.left;
    const clickedY = e.clientY - difference.top;

    const relativeX = Math.round((e.nativeEvent.offsetX / width) * 100);
    const relativeY = Math.round((e.nativeEvent.offsetY / height) * 100);
    console.log(relativeX);
    console.log(relativeY);
    setCurrentCoords({ x: clickedX, y: clickedY });
    setRelativeCoords({x: relativeX, y: relativeY});
    setShowTargetBox(true);
  }
  
  
  return (
    <div>
      <div className="character-display">
        <p>
          Find the following characters!
        </p>
        <img
        src={Evee}
        className="character-image"
        alt="evee"
        />
        <img
        src={Psyduck}
        className="character-image"
        alt="psyduck"
        />
        <img
        src={Togepi}
        className="character-image"
        alt="togepi"
        />
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <img
          src={background}
          id="image"
          className="background"
          alt="pokemon"
          onClick={handleImageClick}
        />
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
