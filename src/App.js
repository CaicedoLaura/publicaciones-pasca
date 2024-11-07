import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import CategoryPage from "./pages/CategoryPage";
import PrivateRoute from "./components/PrivateRoute";
import CreatePostForm from "./components/CreatePostForm";
import Footer from "./pages/Footer";
import PostView from "./components/PostView";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/categoria/:category" element={<CategoryPage />} />
            <Route
              path="/create-post"
              element={
                <PrivateRoute
                  component={CreatePostForm}
                  requiredRole="profesional"
                />
              }
            />
            <Route path="/post/:id" element={<PostView />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
