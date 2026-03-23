import { useEffect, useState } from "react";
import { getCharacters, getEpisodes, getLocations } from "./Api";
import "./App.css";
import CharacterCard from "./components/CharacterCard";
import EpisodeCard from "./components/EpisodeCard";
import LocationCard from "./components/LocationCard";
import CharacterModal from "./components/CharacterModal";

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
          <CharacterCard
            key={char.id}
            char={char}
            onSelect={setSelectedCharacter}
          />
        ));
    } else if (activeTab === "episodes") {
      return episodes
        .filter((ep) =>
          ep.name.toLowerCase().includes(searchItem.toLowerCase()),
        )
        .map((ep) => <EpisodeCard key={ep.id} ep={ep} />);
    } else if (activeTab === "locations") {
      return locations
        .filter((loc) =>
          loc.name.toLowerCase().includes(searchItem.toLowerCase()),
        )
        .map((loc) => <LocationCard key={loc.id} loc={loc} />);
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

      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
}

export default App;
