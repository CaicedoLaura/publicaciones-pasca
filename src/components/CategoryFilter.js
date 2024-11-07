import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSeedling,
  faUmbrellaBeach,
  faStore,
  faFutbol,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  { id: "", label: "Todas", icon: faHome },
  { id: "información-general", label: "Información General", icon: faHome },
  { id: "agricultura", label: "Agricultura", icon: faSeedling },
  { id: "turismo", label: "Turismo", icon: faUmbrellaBeach },
  { id: "comercio", label: "Comercio", icon: faStore },
  { id: "deportes", label: "Deportes", icon: faFutbol },
];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter-container">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button ${
            selectedCategory === category.id ? "active" : ""
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          <FontAwesomeIcon icon={category.icon} />
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
