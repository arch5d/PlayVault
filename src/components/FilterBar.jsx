const FilterBar = ({ search, setSearch, genre, setGenre, genres }) => {
    return (
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="all">All Genres</option>
          {genres.map((g, i) => (
            <option key={i} value={g}>{g}</option>
          ))}
        </select>
      </div>
    );
  };
  
  export default FilterBar;
  