import PostForm from "../components/PostForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You must be logged in to create a post.");
        navigate("/");
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/home");
    } catch (error) {
      console.log("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="container mx-auto max-w-2xl py-16 px-8 ">
      <h2 className="text-3xl font-bold mb-4 pb-6 pt-24">Create New Post</h2>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;
