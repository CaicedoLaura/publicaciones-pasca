import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  const contenidoResumen =
    post.contenido.length > 1000
      ? post.contenido.substring(0, 1500) + "..."
      : post.contenido;

  return (
    <div className="post-card">
      <div className="post-details">
        <h2>{post.titulo}</h2>
        <p
          className="post-summary"
          dangerouslySetInnerHTML={{ __html: contenidoResumen }}
        ></p>
        <Link to={`/post/${post.id}`} className="view-more-link">
          Leer más
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
