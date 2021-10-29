import ListItem from "./ListItem";

const PokeList = ({ pokeData, handleModalOpen, upperCase }) => {
  return (
    <div className="poke-list">
      {pokeData ? (
        pokeData.map((pokemon, index) => (
          <ListItem
            key={index}
            pokemon={pokemon}
            handleModalOpen={handleModalOpen}
            upperCase={upperCase}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokeList;
