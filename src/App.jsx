import { useEffect, useState } from "react";
import { getCharacters } from "./Api";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getCharacters(1);

      console.log("Gelen Paket:", data); //datanın resultta saklandıgını gördük

      if (data && data.results) {
        setCharacters(data.results);
      }

      setLoading(false); //
    };

    loadData(); // fonk napicagını anlattık simdi cagiriyoruz
  }, []);

  return (
    <div className="app-container">
      <h1 className="main-title">RickVerse</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search Caracters"
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
      </div>
      {loading ? (
        <div className="loading-container">
          <div className="loading"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <div className="card-grid">
          {characters
            .filter((char) =>
              char.name.toLowerCase().includes(searchItem.toLowerCase()),
            )

            .map((char) => (
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
                  <p className="location-label">Origin: {char.origin.name}</p>{" "}
                  {/*origin string değil objedir*/}{" "}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default App;
