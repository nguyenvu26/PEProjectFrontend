import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

// Import các page CRUD
import ManagePostsPage from "./App";
import CreatePostPage from "./CreatePostPage";
import UpdatePostPage from "./UpdatePostPage";
import DeletePostPage from "./DeletePostPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ManagePostsPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/edit/:id" element={<UpdatePostPage />} />
        <Route path="/delete/:id" element={<DeletePostPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
