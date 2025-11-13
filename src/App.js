import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManagePostsPage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("az");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ⚙️ API URL
  const baseURL = "https://localhost:7035/api/Posts";

  // 🧠 Hàm load posts
  const fetchPosts = async () => {
    try {
      setLoading(true);

      const queryParams = [];
      if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
      if (sort) queryParams.push(`sort=${encodeURIComponent(sort)}`);
      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

      const res = await fetch(`${baseURL}${queryString}`);
      if (!res.ok) throw new Error("Failed to fetch posts");

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("❌ Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  // ⏳ Fetch khi load trang hoặc khi search/sort thay đổi
  useEffect(() => {
    fetchPosts();
  }, [search, sort]);

  // 🧭 Điều hướng
  const handleCreate = () => navigate("/create");
  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleDelete = (id) => navigate(`/delete/${id}`);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* HEADER */}
      <header className="flex justify-between items-center px-8 py-4 bg-gray-800 shadow">
        <h1 className="text-lg font-semibold">Movie Manager</h1>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white font-medium"
        >
          + Create
        </button>
      </header>

      <main className="max-w-6xl mx-auto py-10 px-4">
        {/* --- HEADER SECTION --- */}
        <section className="bg-gray-800 rounded-2xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">
            Streamline Your Content Management
          </h2>
          <p className="text-gray-400 mb-6">
            Quickly add, edit, and organize all your posts in one place.
          </p>
          <button
            onClick={handleCreate}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg text-white font-medium"
          >
            Create New Post
          </button>
        </section>

        {/* --- SEARCH & SORT --- */}
        <div className="flex justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search movies by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-800 px-4 py-2 rounded-lg w-1/2 outline-none"
          />
          <button
            onClick={() => setSort(sort === "az" ? "za" : "az")}
            className="bg-gray-800 px-4 py-2 rounded-lg"
          >
            Sort: {sort === "az" ? "A → Z" : "Z → A"}
          </button>
        </div>

        {/* --- POSTS GRID --- */}
        {loading ? (
          <p className="text-center text-gray-400">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex flex-col"
              >
                <img
                  src={
                    post.posterImage ||
                    "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  }
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 flex-1">
                    {post.genre}
                  </p>

                  <div className="flex justify-between mt-auto">
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="bg-gray-700 hover:bg-gray-600 text-sm px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="bg-red-600 hover:bg-red-500 text-sm px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="text-center text-gray-500 py-6 border-t border-gray-800 mt-10">
        © 2025 ManagePosts. All rights reserved.
      </footer>
    </div>
  );
}

export default ManagePostsPage;
