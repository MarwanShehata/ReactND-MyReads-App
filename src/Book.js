import React, { Component } from "react";
import ShelfChanger from "../src/ShelfChanger";
import * as BooksAPI from "./BooksAPI";

export default class Book extends Component {
  // I tried to add the update function to the componentDidMount method, but it didn't work.
  // Can't figure out why.
  // Isn't all promises and async functions must be handled in the componentDidMount method?
  // So instead I broke it into separate methods outside of the componentDidMount method (changeShelf)
  // getAll() method returns a promise, so we can use async/await
  shelfSetter = () => {
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
  render() {
    const { book, title, authors, shelf } = this.props;
    const authorList = authors ? authors : ["Author Unknown"];

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                book.imageLinks && book.imageLinks.thumbnail
                  ? `url(${book.imageLinks.thumbnail})`
                  : `url("https://loremflickr.com/128/193")`, // Or we can use a placeholder image from the web app's server
            }}
          />{" "}
          {this.shelfSetter ? (
            <ShelfChanger
              book={book}
              refreshShelves={this.shelfSetter}
              shelf={book.shelf ? book.shelf : "none"}
            />
          ) : (
            <ShelfChanger
              book={book}
              shelf={book.shelf ? book.shelf : "none"}
            />
          )}{" "}
        </div>{" "}
        <div className="book-title"> {title} </div>{" "}
        <div className="book-authors"> {authorList.join(", ")} </div>{" "}
      </div>
    );
  }
}

// const Book = ({ book, title, authors, thumbnail, refreshShelves, shelf }) => {
//   const authorList = authors ? authors : ["Author Unknown"];
//   refreshShelves = () => {
//     BooksAPI.getAll()
//       .then((response) =>
//         this.setState({ shelvedBooks: response, error: false })
//       )
//       .catch((error) => this.setState({ error: true }));
//   };

//   const thumb = thumbnail
//     ? thumbnail
//     : "https://via.placeholder.com/128x193?text=No%Cover";

//   return (

//   );
// };

// export default Book;
