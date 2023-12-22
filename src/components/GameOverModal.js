import { useState } from 'react';
import './GameOverModal.css';

function GameOverModal( { handleCloseModal } ) {
  let [isOpen, setIsOpen] = useState(true);

  return (
      <div className="modal-overlay">
        <div className="modal">
          <span className="close-modal" onClick={handleCloseModal}>
            &times;
          </span>
          <p>You Win!</p>
        </div>
    </div>
  );
}

export default GameOverModal;