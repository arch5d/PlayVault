import { useEffect, useState } from "react";
import "./App.css";
import GameCard from "./components/GameCard";
import GameModal from "./components/GameModal";

function App() {
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [search, setSearch] = useState("");
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // 🧠 Fetch from FreeToGame API
  useEffect(() => {
    fetch("https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api/games")
      .then(res => res.json())
      .then(data => {
        setGames(data.slice(0, 20));
        setLoading(false); // ✅ done loading
      })
      .catch(err => {
        console.error("Error fetching games:", err);
        setLoading(false); // ✅ still end loading on error
      });
  }, []);  
  
  
  
  const toggleFavorite = (game) => {
    const isFav = favorites.some((fav) => fav.id === game.id);
    if (isFav) {
      setFavorites(favorites.filter((fav) => fav.id !== game.id));
    } else {
      setFavorites([...favorites, game]);
    }
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  

  return (
    <div className="app">
      <header>
        <h1 className="main-title">🎮 PlayVault</h1>
        <p className="subtitle">Click any game to learn more</p>
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        <button onClick={() => setDarkMode((prev) => !prev)} className="dark-toggle">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>
      <div className="filters">
  <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
    <option value="All">All Genres</option>
    {Array.from(new Set(games.map((g) => g.genre))).map((genre) => (
      <option key={genre} value={genre}>{genre}</option>
    ))}
  </select>

  <select value={selectedPlatform} onChange={(e) => setSelectedPlatform(e.target.value)}>
    <option value="All">All Platforms</option>
    {Array.from(new Set(games.map((g) => g.platform))).map((platform) => (
      <option key={platform} value={platform}>{platform}</option>
    ))}
  </select>
</div>

      <div className="grid">
      {games
  .filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedGenre === "All" || game.genre === selectedGenre) &&
    (selectedPlatform === "All" || game.platform === selectedPlatform)
  )
  .map((game) => (
    <div key={game.id} onClick={() => setSelectedGame(game)}>
      <GameCard
        game={{
          title: game.title,
          genre: game.genre,
          platform: game.platform,
          rating: "N/A",
          image: game.thumbnail,
          description: game.short_description,
        }}
        isFavorite={favorites.some((fav) => fav.id === game.id)}
        onToggleFavorite={() => toggleFavorite(game)}
      />
    </div>
  ))}
</div>


      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
}

export default App;
