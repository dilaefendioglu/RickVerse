import { useEffect, useState } from "react";
import { getCharacters } from "./Api";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await getCharacters(currentPage);

      console.log("Gelen Paket:", data); //datanın resultta saklandıgını gördük

      if (data && data.results) {
        setCharacters(data.results);
      } else {
        setCharacters([]); // Hiç sonuç yoksa ekranı temizle
      }

      setLoading(false); //
    };

    loadData(); // fonk napicagını anlattık simdi cagiriyoruz
  }, [currentPage]); //ikisinden brii değiştiği an api isteği tekrar at

  return (
    <div className="app-container">
      <h1 className="main-title">RickVerse</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search Caracters"
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
    </div>
  );
}

export default App;
