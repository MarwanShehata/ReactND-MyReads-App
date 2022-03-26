import React from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import { Route } from "react-router-dom";
import SearchBooks from "../src/components/SearchBooks";

const BooksApp = () => {
  return (
    <div className="app">
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={SearchBooks} />
    </div>
  );
};

export default BooksApp;
