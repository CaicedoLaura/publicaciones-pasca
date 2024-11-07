import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api.js";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

const PostView = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userRating, setUserRating] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postResponse = await api.get(`/api/posts/${id}`);
        setPost(postResponse.data);

        const commentsResponse = await api.get(`/api/comments/${id}`);
        setComments(commentsResponse.data);

        const ratingResponse = await api.get(`/api/ratings/${id}`);
        setAverageRating(ratingResponse.data.averageRating || 0);
      } catch (error) {
        console.error("Error al obtener los datos del post:", error);
      }
    };
    fetchPostData();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      await api.post("/api/comments", { content: newComment, postId: id });
      setNewComment("");
      const updatedComments = await api.get(`/api/comments/${id}`);
      setComments(updatedComments.data);
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleRatingSubmit = async (newRating) => {
    try {
      await api.post("/api/ratings", { estrellas: newRating, postId: id });
      setUserRating(newRating);
      const updatedRating = await api.get(`/api/ratings/${id}`);
      setAverageRating(updatedRating.data.averageRating || 0);
    } catch (error) {
      console.error("Error al agregar valoración:", error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-view-container">
      <h1>{post.titulo}</h1>
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.contenido }}
      ></div>

      {post.imagenes && post.imagenes.length > 0 && (
        <div className="post-images">
          <h3>Galería de Imágenes</h3>
          <div className="images-gallery">
            {post.imagenes.map((url, index) => (
              <img
                key={index}
                src={`http://localhost:4000${url}`}
                alt={`Imagen ${index + 1}`}
                className="post-gallery-image"
              />
            ))}
          </div>
        </div>
      )}

      {/* Valoración */}
      <div className="rating-section">
        <h3>Valoración promedio: {averageRating.toFixed(1)}</h3>
        {isAuthenticated && (
          <div className="user-rating">
            <ReactStars
              count={5}
              value={userRating || averageRating}
              onChange={handleRatingSubmit}
              size={30}
              activeColor="#ffd700"
            />
            <p>{userRating ? "Actualizar valoración" : "Valora este post"}</p>
          </div>
        )}
      </div>

      {/* Comentarios */}
      <div className="comments-section">
        <h3>Comentarios</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.usuario_nombre || "Usuario Anónimo"}</strong>:{" "}
              {comment.content}
            </div>
          ))
        ) : (
          <p>No hay comentarios aún.</p>
        )}

        {isAuthenticated ? (
          <div className="add-comment">
            <textarea
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
            ></textarea>
            <button onClick={handleCommentSubmit}>Enviar</button>
          </div>
        ) : (
          <p>Inicia sesión para comentar en este post.</p>
        )}
      </div>
    </div>
  );
};

export default PostView;
