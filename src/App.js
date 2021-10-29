import { useState, useEffect } from "react";
import "./styles/app.css";

import PokeList from "./components/PokeList";
import PokeDisplay from "./components/PokeDisplay";
import PokeQuery from "./components/PokeQuery";

const App = () => {
  const [pokeData, setPokeData] = useState(null);
  const [links, setLinks] = useState({ next: null, previous: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const upperCase = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  };

  const handleModalOpen = (url) => {
    console.log(url);
    setIsModalOpen(url);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setPokeData(data.results);
    setLinks({ next: data.next, previous: data.previous });
  };

  const handlePagination = (event) => {
    let url = event.target.id === "next" ? links.next : links.previous;
    handleFetch(url);
  };

  useEffect(() => {
    if (!pokeData) {
      handleFetch("https://pokeapi.co/api/v2/pokemon");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-wrapper">
      {isModalOpen && (
        <PokeDisplay
          url={isModalOpen}
          handleModalClose={handleModalClose}
          upperCase={upperCase}
        />
      )}
      <div className="inner-wrapper">
        <button
          className="arrow-button"
          id="previous"
          onClick={handlePagination}
          disabled={!links.previous}
        >
          {"<"}
        </button>
        <PokeList
          pokeData={pokeData}
          handleModalOpen={handleModalOpen}
          upperCase={upperCase}
        />
        <button
          className="arrow-button"
          id="next"
          onClick={handlePagination}
          disabled={!links.next}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default App;
