import { useState, useEffect } from "react";
import axios from "axios";
import PetList from "../../components/pets/PetList";
import CreatePet from "./CreatePet";

const PetManagementPage = () => {
  const [viewType, setViewType] = useState("myPets");
  const [pets, setPets] = useState([]);
  const [isCreatePetOpen, setIsCreatePetOpen] = useState(false); // State để điều khiển popup

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`/api/pets/${viewType}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPets(response.data);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [viewType]); // Fetch pets when viewType changes

  const toggleCreatePetPopup = () => {
    setIsCreatePetOpen(!isCreatePetOpen); // Đảo ngược trạng thái của popup
  };

  return (
    <div className="flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen">
      {/* Header */}
      <div className="flex w-full border-b border-gray-600">
        <div
          className={`flex justify-center flex-1 p-3 ${
            viewType === "myPets" ? "bg-secondary" : ""
          } transition duration-300 cursor-pointer`}
          onClick={() => setViewType("myPets")}
        >
          My Pets
        </div>
        <div
          className={`flex justify-center flex-1 p-3 ${
            viewType === "allPets" ? "bg-secondary" : ""
          } transition duration-300 cursor-pointer`}
          onClick={() => setViewType("allPets")}
        >
          All Pets
        </div>
      </div>

      {/* Button to open CreatePet Modal */}
      <button
        onClick={toggleCreatePetPopup}
        className="btn btn-primary mt-4 mb-4 ml-4"
      >
        Create Pet
      </button>

      {/* Pet List */}
      <PetList pets={pets} />

      {/* CreatePet Popup */}
      {isCreatePetOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-transparent p-6 relative w-full max-w-lg">
            <CreatePet />
            {/* Close Button */}
            <button
              onClick={toggleCreatePetPopup}
              className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetManagementPage;
