import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  MemoryRouter,
} from "react-router-dom";
import { Home } from "./Home";
import { Product } from "./Product";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />}></Route>
        <Route path="/users"></Route>
        <Route path="/"></Route>
      </Routes>
    </Router>
  );
}

export default App;
