import { useState } from "react";
import "./GameCard.css";

const GameCard = ({ game, isFavorite, onToggleFavorite }) => {
  const [animating, setAnimating] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setAnimating(true);
    onToggleFavorite();
  };

  return (
    <div className="card">
      <button
        className={`fav-btn ${animating ? "animate" : ""}`}
        onClick={handleFavoriteClick}
        onAnimationEnd={() => setAnimating(false)}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <img src={game.thumbnail} alt={game.title} className="game-img" />
      <h3>{game.title}</h3>
      <p><strong>Genre:</strong> {game.genre}</p>
      <p><strong>Platform:</strong> {game.platform}</p>
    </div>
  );
};

export default GameCard;
