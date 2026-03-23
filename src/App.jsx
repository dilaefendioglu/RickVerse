import { useEffect, useState } from "react";
import { getCharacters, getEpisodes } from "./Api";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [episodes, setEpisodes] = useState([]);
  const [activeTab, setActiveTab] = useState("characters");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      if (activeTab === "characters") {
        const data = await getCharacters(currentPage);
        console.log("caharacters:", data);
        setCharacters(data?.results || []);
      } else {
        const data = await getEpisodes(currentPage);
        console.log("episodes:", data);
        setEpisodes(data?.results || []);
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
      </div>

      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder={
            activeTab === "characters"
              ? "Search characters..."
              : "Search episodes..."
          }
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
          <div className="card-grid">
            {activeTab === "characters"
              ? characters
                  .filter((char) =>
                    char.name.toLowerCase().includes(searchItem.toLowerCase()),
                  )

                  .map((char) => (
                    <div
                      key={char.id}
                      onClick={() => {
                        console.log("Karakter seçildi:", char.name); // Çalıştığını konsoldan gör diye
                        setSelectedCharacter(char);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <div key={char.id} className="character-card">
                        <div className="image-wrapper">
                          <img src={char.image} alt={char.name} />
                        </div>
                        <div className="character-details">
                          <h3>{char.name}</h3>
                          <div className="status-info">
                            {/* Dinamik class kullanımı: status alive ise yeşil, dead ise kırmızı nokta */}
                            <span
                              className={`status-icon ${char.status.toLowerCase()}`}
                            ></span>
                            <span>
                              {char.status} - {char.species}
                            </span>
                          </div>
                          <p className="location-label">
                            Origin: {char.origin.name}
                          </p>{" "}
                          {/*origin string değil objedir*/}{" "}
                        </div>
                      </div>
                    </div>
                  ))
              : // EPISODES BURADA BAŞLIYOR
                episodes
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
                  ))}
          </div>

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
        <div className="modal-overlay">
          {" "}
          {/* onClick kaldırıldı */}
          <div className="modal-content">
            {" "}
            {/* stopPropagation kaldırıldı */}
            <button onClick={() => setSelectedCharacter(null)}>X</button>
            <div className="modal-details">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                width="100"
              />
              <h2>{selectedCharacter.name}</h2>

              <p>
                <strong>Status:</strong>
                {selectedCharacter.status}
              </p>
              <p>
                <strong>Species:</strong> {selectedCharacter.species}
              </p>
              <p>
                <strong>Gender:</strong> {selectedCharacter.gender}
              </p>
              <p>
                <strong>Origin:</strong> {selectedCharacter.origin.name}
              </p>
              <p>
                <strong>Last Location:</strong>{" "}
                {selectedCharacter.location.name}
              </p>
              <p> {selectedCharacter.episode}</p>

              <div className="episode-list-container">
                <strong>Played Episodes:</strong>
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
