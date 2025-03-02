import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const PostForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [generating, setGenerating] = useState(false);

  // AI Assistance Functions

  const handleGenerateContent = async () => {
    setGenerating(true);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ai/generate`,
        { prompt: title || "Write a blog post" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent(response.data.content);
    } catch (error) {
      console.error("Error generating content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    } else if (initialData?.image) {
      formData.append("image", initialData.image);
    }

    try {
      // Only call the onSubmit function passed as a prop
      await onSubmit(formData); // Assuming onSubmit is an async function
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setLoading(false); // Set loading to false after form submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border border-neutral-600 rounded-3xl px-4 focus:outline-none"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full h-36 p-3 border border-neutral-600  rounded-lg resize-none focus:outline-none"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-80 p-2 px-4 border-none  rounded-3xl focus:outline-none file:bg-stone-800 file:py-2 file:px-4 file:border-none file:mr-4 "
        accept="image/*"
      />
      <div className="flex justify-center">
        <button
          type="button"
          className="w-80 p-3 bg-stone-800 text-white focus:outline-none rounded-3xl"
          onClick={handleGenerateContent}
          disabled={loading} // Disable the button while loading
        >
          {generating ? "Generating..." : "Generate with AI"}
        </button>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-80 p-3 bg-stone-800 text-white rounded-3xl"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
};

PostForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default PostForm;
