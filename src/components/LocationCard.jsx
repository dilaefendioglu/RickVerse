const LocationCard = ({ loc }) => {
  return (
    <div className="character-card location-card">
      <div className="location-header">
        <span className="location-type-badge">{loc.type}</span>
        <h3>{loc.name}</h3>
      </div>
      <div className="character-details">
        <p className="dimension-text">
          <strong>Dimension:</strong> {loc.dimension}
        </p>
      </div>
    </div>
  );
};

export default LocationCard;
