
const CharacterModal = ({ character, onClose }) => {
  // Eğer karakter seçili değilse (null ise), hiçbir şey gösterme
  if (!character) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* kutuya tıkladığında kapanması engellenir */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>X</button>
        <img src={character.image} alt={character.name} />
        <div className="modal-details">
          <h1>{character.name}</h1>

          <h3>
            <strong>Status: </strong>
            {character.status}
          </h3>
          <h3>
            <strong>Species: </strong> {character.species}
          </h3>
          <h3>
            <strong>Gender: </strong> {character.gender}
          </h3>
          <h3>
            <strong>Origin: </strong> {character.origin.name}
          </h3>
          <h3>
            <strong>Last Location: </strong>
            {character.location.name}
          </h3>

          <h3>
            <strong>Played Episodes: </strong>
          </h3>

          <div className="episode-list-container">
            <ul>
              {character.episode.map((epUrl, index) => (
                <li key={index}>Episode {epUrl.split("/").pop()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;