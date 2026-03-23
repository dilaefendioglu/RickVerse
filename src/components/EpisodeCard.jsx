const EpisodeCard = ({ ep }) => {
  return (
    <div className="character-card episode-card">
      <div className="episode-header">
        <h3>{ep.episode}</h3>
      </div>
      <div className="character-details episode-details">
        <h4>{ep.name}</h4>
        <p className="air-date">Air Date: {ep.air_date}</p>
      </div>
    </div>
  );
};

export default EpisodeCard;
