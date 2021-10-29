const ListItem = ({ pokemon, handleModalOpen, upperCase }) => (
  <div
    className="poke-list-item"
    onClick={() => handleModalOpen(pokemon.url)}
  >
    <p>{upperCase(pokemon.name)}</p>
  </div>
);

export default ListItem
