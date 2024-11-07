import React, { useState } from "react";
import api from "../api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";

const CreatePostForm = () => {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState(null);
  const [categoria, setCategoria] = useState("Información General");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("contenido", contenido);
    formData.append("categoria", categoria);

    if (imagen) {
      formData.append("imagen_url", imagen);
    }

    try {
      const response = await api.post("/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.message);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Error al crear la publicación");
    }
  };

  const handleMainImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleEditorImageUpload = async (blobInfo, success, failure) => {
    const formData = new FormData();
    formData.append("imagen", blobInfo.blob());

    try {
      const response = await api.post("/api/posts/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      success(response.data.imagenUrl);
    } catch (error) {
      failure("Error al subir la imagen");
    }
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Crear Nueva Publicación</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contenido:</label>
            <Editor
              apiKey="h9vx2fx5ennaivwa9xwsklpycklriky0fd0lib315429q9lp"
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar: `undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help | image`,
                images_upload_handler: handleEditorImageUpload,
                paste_data_images: true,
                automatic_uploads: true,
                file_picker_types: "image",
                image_title: true,
                paste_preprocess: (plugin, args) => {
                  args.content = args.content.replace(/file:\/\/\S+/g, "");
                },
              }}
              value={contenido}
              onEditorChange={(newContent) => setContenido(newContent)}
            />
          </div>
          <div className="form-group">
            <label>Imagen Principal:</label>
            <input
              type="file"
              onChange={handleMainImageChange}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            >
              <option>Información General</option>
              <option>Agricultura</option>
              <option>Turismo</option>
              <option>Comercio</option>
              <option>Deportes</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Crear Publicación
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostForm;
