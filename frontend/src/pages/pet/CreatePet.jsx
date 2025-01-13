import { CiImageOn } from "react-icons/ci";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const CreatePet = () => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");  // Thêm state cho age
  const [img, setImg] = useState(null);
  const imgRef = useRef(null);

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const {
    mutate: createPet,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ name, species, age, img }) => {
      try {
        const res = await fetch("/api/pets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, species, age, img }), // Thêm age vào payload
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      setName("");
      setSpecies("");
      setAge("");  // Reset age
      setImg(null);
      toast.success("Pet created successfully");
      queryClient.invalidateQueries({ queryKey: ["pets"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPet({ name, species, age, img });  // Gửi age khi tạo pet
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <div className="flex justify-center">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
          <img src={authUser.profileImg || "/avatar-placeholder.png"} alt="Avatar" className="object-cover w-full h-full" />
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Input for Pet Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Pet Name</label>
          <input
            type="text"
            className="mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Enter pet name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Input for Species */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Species</label>
          <input
            type="text"
            className="mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Enter pet species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </div>

        {/* Input for Age */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50 text-lg focus:ring-2 focus:ring-primary-500"
            placeholder="Enter pet age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* Image Preview */}
        {img && (
          <div className="relative">
            <IoCloseSharp
              className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-6 h-6 cursor-pointer"
              onClick={() => {
                setImg(null);
                imgRef.current.value = null;
              }}
            />
            <img src={img} className="w-full mx-auto h-72 object-contain rounded-lg" alt="Pet Preview" />
          </div>
        )}

        {/* Image Upload and Submit */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <CiImageOn
              className="text-primary-500 w-7 h-7 cursor-pointer"
              onClick={() => imgRef.current.click()}
            />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imgRef}
              onChange={handleImgChange}
            />
          </div>

          <button
            type="submit"
            className="btn bg-primary-500 hover:bg-primary-600 text-white py-2 px-6 rounded-lg focus:outline-none"
          >
            {isPending ? "Creating..." : "Create Pet"}
          </button>
        </div>

        {/* Error Message */}
        {isError && <div className="text-red-500 text-sm">{error.message}</div>}
      </form>
    </div>
  );
};

export default CreatePet;
