import Pet from "./Pet";

const PetList = ({ pets }) => {
  return (
    <div>
      {pets.length === 0 ? (
        <p>No pets available.</p>
      ) : (
        pets.map((pet) => <Pet key={pet._id} pet={pet} />)
      )}
    </div>
  );
};

export default PetList;
