import React, { Component } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import { Route } from "react-router-dom";
import SearchBooks from "../src/components/SearchBooks";
import * as BooksAPI from "././BooksAPI";

export default class App extends Component {
  state = {
    books: [],
  };
  async componentDidMount() {
    // I tried to add the update function to the componentDidMount method, but it didn't work.
    // Can't figure out why.
    // Isn't all promises and async functions must be handled in the componentDidMount method?
    // So instead I broke it into separate methods outside of the componentDidMount method (changeShelf)
    try {
      const books = await BooksAPI.getAll();
      // the metadata is already converted to JSON, so we don't need to convert it again
      // I downloaded the response using postman and saved it as a JSON file called "response.json" just to visualize it
      this.setState({ books, error: false });
    } catch (error) {
      this.setState({ error: true });
      // handling errors from the API call here
    }
  }

  shelfSetter(shelf) {
    return this.state.books.filter((book) => book.shelf === shelf);
  } // haven't used it yet, used to get array of books on a shelf (currentlyReading, wantToRead, read)

  updateShelf = (book, shelf) => {
    if (this.state.error !== false) {
      this.setState((metaData) => ({
        books: metaData.books
          .filter((filteredBooks) => filteredBooks.id !== book.id)
          .concat({ ...book, shelf: shelf }),
      }));
      BooksAPI.update(book, shelf);
    }
  };

  booksStateUpdate = () => {
    BooksAPI.getAll()
      .then((response) =>
        this.setState({
          books: response,
          error: false,
        })
      )
      .catch((error) =>
        this.setState({
          error: true,
        })
      );
  };

  // changeShelf = (book, shelf) => {
  //   if (this.state.error !== true) {
  //     BooksAPI.update({ id: book.id, shelf: book.shelf }, shelf).then(
  //       (metaData) => {
  //         if (metaData) {
  //           this.setState((state) => ({
  //             books: state.books.map((mappedBook) => {
  //               if (mappedBook.id === book.id) {
  //                 mappedBook.shelf = shelf;
  //               }
  //               // we can instead use Object.assign({}, mappedBook, { shelf: shelf })
  //               // or filter the books array and chaining it with concat
  //               return mappedBook;
  //             }),
  //           }));
  //         }
  //       }
  //     );
  //   }
  // };

  render() {
    return (
      <div className="app">
        {/* Couldn't pass props in the commented syntax */}
        {/* <Route exact path="/" component={HomePage} /> */}
        {/* <Route path="/search" component={SearchBooks} /> */}
        <Route
          path="/"
          exact
          render={() => (
            <HomePage
              books={this.state.books}
              updateShelf={this.updateShelf}
              // changeShelf={this.changeShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              updateShelf={this.updateShelf}
              // changeShelf={this.changeShelf}
            />
          )}
        />
      </div>
    );
  }
}
