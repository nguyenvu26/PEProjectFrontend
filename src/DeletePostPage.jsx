import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function DeletePostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const baseURL = "https://localhost:7035/api/Posts";

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

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      alert("✅ Post deleted successfully!");
      navigate("/"); // ⬅ tự động về trang chính
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete post");
    }
  };

  if (!post)
    return <p className="text-center text-gray-400 mt-10">Loading post...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl p-8 shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Delete Post</h2>
        <p className="text-gray-300 mb-4">
          Are you sure you want to delete <b>{post.name}</b>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded-lg text-white"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg text-white"
          >
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePostPage;
