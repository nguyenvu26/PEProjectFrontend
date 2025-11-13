import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdatePostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const baseURL = "https://peprojectbackend.onrender.com/api/Posts";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${baseURL}/${id}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", post.name);
      formData.append("description", post.description);
      if (post.newImage) formData.append("image", post.newImage);

      const res = await fetch(`${baseURL}/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update post");
      alert("✅ Post updated successfully!");
      navigate("/"); // ⬅ tự động quay lại
    } catch (err) {
      console.error(err);
      alert("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!post)
    return <p className="text-center text-gray-400 mt-10">Loading post...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-center">Update Post</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg"
          >
            ⬅ Back to Home
          </button>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            value={post.name}
            onChange={(e) => setPost({ ...post, name: e.target.value })}
            className="p-3 rounded-lg bg-gray-700 outline-none"
          />
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            rows="4"
            className="p-3 rounded-lg bg-gray-700 outline-none"
          />
          <input
            type="file"
            className="p-2 bg-gray-700 rounded-lg"
            onChange={(e) =>
              setPost({ ...post, newImage: e.target.files[0] })
            }
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg text-white font-medium"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePostPage;
