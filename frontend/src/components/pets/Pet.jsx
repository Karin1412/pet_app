const Pet = ({ pet }) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-700">
      <img
        src={pet.img}
        alt={pet.name}
        className="w-16 h-16 object-cover rounded-full"
      />
      <div>
        <h3 className="text-lg font-bold">{pet.name}</h3>
        <p className="text-gray-400">
          {pet.species}, {pet.age} year(s) old
        </p>
      </div>
    </div>
  );
};

export default Pet;
