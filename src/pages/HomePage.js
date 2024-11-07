import React, { useEffect, useState, useCallback } from "react";
import CategoryFilter from "../components/CategoryFilter";
import api from "../api";
import PostCard from "../components/PostCard";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState("");

  const fetchPosts = useCallback(async () => {
    try {
      const endpoint = category
        ? `/api/posts/category/${category}`
        : "/api/posts";
      const response = await api.get(endpoint);
      setPosts(response.data);
    } catch (error) {
      console.error("Error al obtener publicaciones:", error);
    }
  }, [category]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="home-page">
      <div>
        <h2>Publicaciones</h2>
      </div>

      {/* Componente de filtro de categorías */}
      <CategoryFilter
        selectedCategory={category}
        onSelectCategory={handleCategoryChange}
      />

      {/* Contenedor de publicaciones */}
      <div className="post-container">
        {posts.length === 0 ? (
          <p className="no-posts-message">No hay publicaciones disponibles.</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
