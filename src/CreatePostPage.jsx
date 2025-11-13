import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const baseURL = "https://peprojectbackend.onrender.com/api/Posts";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description || !image) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image);

      const res = await fetch(baseURL, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create post");
      alert("✅ Post created successfully!");
      navigate("/"); // ⬅ về trang chính
    } catch (err) {
      console.error(err);
      alert("❌ Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-center">Create New Post</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            ⬅ Back to Home
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Post Title"
            className="p-3 rounded-lg bg-gray-700 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="p-3 rounded-lg bg-gray-700 outline-none"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            className="p-2 bg-gray-700 rounded-lg"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg text-white font-medium"
          >
            {loading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
