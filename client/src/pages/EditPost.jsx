import { useState, useEffect } from "react";
import PostForm from "../components/PostForm";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        navigate("/");
        return;
      }
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl  px-8 pt-28">
      <h2 className="text-3xl font-bold mb-4">Edit Post</h2>
      <PostForm onSubmit={handleSubmit} initialData={post} />
    </div>
  );
};

export default EditPost;
