import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import { Route } from "react-router-dom";
import SearchBooks from "../src/components/SearchBooks";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchBooks} />
      </div>
    );
  }
}
