const CharacterCard = ({ char, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(char)}
      className="character-card"
      style={{ cursor: "pointer" }}
    >
      <div className="image-wrapper">
        <img src={char.image} alt={char.name} />
      </div>
      <div className="character-details">
        <h3>{char.name}</h3>
        <div className="status-info">
          <span className={`status-icon ${char.status.toLowerCase()}`}></span>
          <span>
            {char.status} - {char.species}
          </span>
        </div>
        <p className="location-label">Origin: {char.origin.name}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
