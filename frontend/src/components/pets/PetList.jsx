import React from "react";

const PetList = ({ pets, viewType }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {pets.map((pet) => (
        <div key={pet._id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <img
              src={pet.img || "/default-pet-image.jpg"}
              alt={pet.name}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <h3 className="text-xl font-semibold text-center mb-2">{pet.name}</h3>
          <p className="text-center text-gray-600">{pet.species}</p>
          <p className="text-center text-gray-500">{pet.age} years old</p>
          {viewType === "allPets" && (
            <p className="text-center text-gray-400 mt-2">
              Owner: {pet.owner?.username || "Unknown"}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PetList;
