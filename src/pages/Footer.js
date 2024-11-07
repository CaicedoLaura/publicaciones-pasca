import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Acerca de Nosotros</h3>
          <p>
            Somos Laura Caicedo, Jerson Romero y María Paula Olmos, y estamos
            representando a la Alcaldía de Pasca, un municipio comprometido con
            el desarrollo sostenible y la innovación en la administración
            pública. Nuestra misión es mejorar la calidad de vida de nuestros
            ciudadanos, y para lograrlo estamos implementando soluciones
            tecnológicas avanzadas que buscan hacer más eficiente la gestión de
            nuestras áreas clave. Creemos en un gobierno cercano, transparente y
            eficiente, que use la tecnología como herramienta para ofrecer
            mejores servicios a la comunidad.
          </p>
        </div>

        <div className="footer-section creators">
          <h3>Creadores del Proyecto</h3>
          <ul>
            <li>Laura Caicedo</li>
            <li>Jerson Romero</li>
            <li>María Paula Olmos</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Nombre del Sitio. Todos los derechos
        reservados.
      </div>
    </footer>
  );
};

export default Footer;
