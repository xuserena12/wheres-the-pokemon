import './GameOverModal.css';
import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

function GameOverModal( { handleCloseModal } ) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const leaderboardCollectionRef = collection(db, 'leaderboard');

  const addToLeaderboard = async () => {
    try {
      await addDoc(leaderboardCollectionRef, {
        name: name,
        time: time,
      });
    } catch (err) {
      console.log(err);
    }
    handleCloseModal();
  };
  
  return (
      <div className="modal-overlay">
        <div className="modal">
          <span className="close-modal" onClick={handleCloseModal}>
            &times;
          </span>
          <p>You Win!</p>
          <p>Please enter your name and time here:</p>
          <input placeholder='Name ' onChange={(e) => setName(e.target.value)}/>
          <input className="time-input "placeholder='Time' onChange={(e) => setTime(e.target.value)}/>
          <buttom className="submit" onClick={addToLeaderboard}>Submit</buttom>
        </div>
    </div>
  );
}

export default GameOverModal;