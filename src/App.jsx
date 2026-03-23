import { useEffect, useState } from "react";
import { getCharacters, getEpisodes, getLocations } from "./Api";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [activeTab, setActiveTab] = useState("characters");
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (activeTab === "characters") {
        const data = await getCharacters(currentPage);
        console.log("caharacters:", data);
        setCharacters(data?.results || []);
      } else if (activeTab === "episodes") {
        const data = await getEpisodes(currentPage);
        console.log("episodes:", data);
        setEpisodes(data?.results || []);
      } else {
        const data = await getLocations(currentPage);
        console.log("locations:", data);
        setLocations(data?.results || []);
      }
      setLoading(false); //
    };

    loadData(); // fonk napicagını anlattık simdi cagiriyoruz
  }, [currentPage, activeTab]); // useeffect ile izlenerek sayfa veya sekmeden biri değiştiği an api isteği tekrar atılacak.

  useEffect(() => {
    if (selectedCharacter) {
      document.body.style.overflow = "hidden"; //overflow = scroll
    } else {
      document.body.style.overflow = "unset"; //sifirla
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedCharacter]);

  const renderSelectedTab = () => {
    if (activeTab === "characters") {
      return characters
        .filter((char) =>
          char.name.toLowerCase().includes(searchItem.toLowerCase()),
        )
        .map((char) => (
          <div
            key={char.id}
            onClick={() => setSelectedCharacter(char)}
            className="character-card"
            style={{ cursor: "pointer" }}
          >
            <div className="image-wrapper">
              <img src={char.image} alt={char.name} />
            </div>
            <div className="character-details">
              <h3>{char.name}</h3>
              <div className="status-info">
                <span
                  className={`status-icon ${char.status.toLowerCase()}`}
                ></span>
                <span>
                  {char.status} - {char.species}
                </span>
              </div>
              <p className="location-label">Origin: {char.origin.name}</p>
            </div>
          </div>
        ));
    } else if (activeTab === "episodes") {
      return episodes
        .filter((ep) =>
          ep.name.toLowerCase().includes(searchItem.toLowerCase()),
        )
        .map((ep) => (
          <div key={ep.id} className="character-card episode-card">
            <div className="episode-header">
              <h3>{ep.episode}</h3>
            </div>
            <div className="character-details episode-details">
              <h4>{ep.name}</h4>
              <p className="air-date">Air Date: {ep.air_date}</p>
            </div>
          </div>
        ));
    } else if (activeTab === "locations") {
      return locations
        .filter((loc) =>
          loc.name.toLowerCase().includes(searchItem.toLowerCase()),
        )
        .map((loc) => (
          <div key={loc.id} className="character-card location-card">
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
        ));
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-title">RickVerse</h1>

      <div className="tab-container">
        <button
          className={activeTab === "characters" ? "active-btn" : "noactive-btn"}
          onClick={() => {
            setActiveTab("characters");
            setCurrentPage(1);
          }}
        >
          Characters
        </button>
        <button
          className={activeTab === "episodes" ? "active-btn" : "noactive-btn"}
          onClick={() => {
            setActiveTab("episodes");
            setCurrentPage(1);
          }}
        >
          Episodes
        </button>
        <button
          className={activeTab === "locations" ? "active-btn" : "noactive-btn"}
          onClick={() => {
            setActiveTab("locations");
            setCurrentPage(1);
          }}
        >
          Locations
        </button>
      </div>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder={`Search ${activeTab}...`}
          onChange={(e) => {
            setSearchItem(e.target.value); //input kutusunun içindekini verir set ile searchıtemi artık güncelliyoruz
          }}
        />
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="card-grid">{renderSelectedTab()}</div>

          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>

            <span className="page-info"> Sayfa {currentPage}</span>

            <button
              className="page-btn"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {selectedCharacter && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCharacter(null)}
        >
          {/* kutuya tıkladığında kapanması engellenir */}
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedCharacter(null)}>X</button>
            <img src={selectedCharacter.image} alt={selectedCharacter.name} />
            <div className="modal-details">
              <h1>{selectedCharacter.name}</h1>

              <h3>
                <strong>Status: </strong>
                {selectedCharacter.status}
              </h3>
              <h3>
                <strong>Species: </strong> {selectedCharacter.species}
              </h3>
              <h3>
                <strong>Gender: </strong> {selectedCharacter.gender}
              </h3>
              <h3>
                <strong>Origin: </strong> {selectedCharacter.origin.name}
              </h3>
              <h3>
                <strong>Last Location: </strong>
                {selectedCharacter.location.name}
              </h3>

              <h3>
                <strong>Played Episodes: </strong>
              </h3>

              <div className="episode-list-container">
                <ul>
                  {selectedCharacter.episode.map((epUrl, index) => (
                    <li key={index}>Episode {epUrl.split("/").pop()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
