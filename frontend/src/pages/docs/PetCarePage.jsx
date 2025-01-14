import { useState, useEffect } from "react";
import PostList from "./PostList"; // Đảm bảo đã import PostList

const mockPosts = [
  {
    _id: "1",
    title: "Chăm sóc thú cưng mùa đông",
    content: "Mùa đông là thời gian quan trọng để chăm sóc thú cưng, nhất là các loài chó và mèo. Đảm bảo rằng chúng luôn có nơi ấm áp và ăn uống đầy đủ.",
  },
  {
    _id: "2",
    title: "Các loại thức ăn tốt cho thú cưng",
    content: "Để thú cưng phát triển khỏe mạnh, thức ăn là yếu tố quan trọng. Hãy chọn các loại thức ăn giàu dinh dưỡng và phù hợp với giống loài của chúng.",
  },
  {
    _id: "3",
    title: "Làm sao để thú cưng không bị căng thẳng?",
    content: "Stress là một vấn đề lớn đối với thú cưng. Hãy tạo ra một môi trường yên tĩnh và thoải mái cho chúng để giảm thiểu căng thẳng.",
  },
];

const PetCarePage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Giả lập lấy dữ liệu từ API
    const fetchPosts = () => {
      setPosts(mockPosts); // Sử dụng dữ liệu giả
    };
    fetchPosts();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadFile = async (postId) => {
    if (!selectedFile) {
      alert("Vui lòng chọn file để tải lên.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      const response = await fetch(`/api/pet-care-posts/${postId}/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Tải lên thành công!");
        setSelectedFile(null);
        setLoading(false);
      } else {
        alert("Tải lên thất bại. Vui lòng thử lại.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Lỗi khi tải lên file:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center text-2xl font-bold my-4">Chăm sóc thú cưng</h1>

      {/* Gọi PostList để hiển thị bài đăng */}
      <PostList posts={posts} />

      {/* <div className="file-upload mt-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          onClick={() => handleUploadFile(posts[0]?._id)} // Tải lên cho bài đăng đầu tiên
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? "Đang tải..." : "Tải lên tài liệu"}
        </button>
      </div> */}
    </div>
  );
};

export default PetCarePage;
