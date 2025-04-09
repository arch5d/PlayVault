import React from "react";
import "./GameModal.css";

const GameModal = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>✖</button>
        <h2>{game.title}</h2>
        <img src={game.image} alt={game.title} />
        <p><strong>Genre:</strong> {game.genre}</p>
        <p><strong>Platform:</strong> {game.platform}</p>
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default GameModal;
